const shortid = require('shortid');
const URL = require('../model/urlModel');
const User = require('../model/userModel'); // Assuming you have a User model

async function shortUrlHandler(req, res) {
    try {
        const url = req.body.longUrl;
          
        console.log(url)
   
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

        if (!urlPattern.test(url)) {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        // Find the authenticated user by userId (to get the username)
        const user = await User.findById(req.user._id);  // Assuming you have a User model

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate a short ID for the URL
        const shortID = shortid.generate();

        // Save the URL to the database, including the user's userId and username
        const newURL = await URL.create({
            shortId: shortID,
            longUrl: url,
            userId: req.user._id,
            hist: [],
            totalClicks: 0,
            uniqueClicks: 0,
            uniqueUsers: 0,
            clicksByDate: []
        });

        // Respond with the short URL details
        return res.status(201).json({ id: shortID, createdAt: newURL.createdAt });
    } catch (error) {
        // Handle errors
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getByShortIdHandler(req, res) {
    try {
        const shortID = req.params.shortId;

        // Find the URL entry
        const entry = await URL.findOne({ shortId: shortID });

        // If the entry does not exist, return a 404 error
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Update visit history and increment total clicks
        entry.hist.push({ ts: Date.now() });
        entry.totalClicks += 1;
        await entry.save();

        // Redirect to the original URL
        return res.redirect(entry.longUrl);
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error in getByShortIdHandler:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function analyticsHandler(req, res) {
    try {
        const shortId = req.params.shortId;

        // Find the URL record by short ID
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // Aggregate unique users and prepare clicksByDate data
        const uniqueUsers = new Set(result.hist.map((visit) => visit.ts));
        const clicksByDate = result.hist.reduce((acc, visit) => {
            const date = new Date(visit.ts).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Respond with analytics data
        return res.json({
            totalClicks: result.totalClicks,
            uniqueClicks: result.uniqueClicks,
            uniqueUsers: uniqueUsers.size,
            clicksByDate,
            analytics: result.hist,
        });
    } catch (error) {
        // Catch and handle any errors
        console.error("Error fetching analytics:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { shortUrlHandler, analyticsHandler, getByShortIdHandler };
