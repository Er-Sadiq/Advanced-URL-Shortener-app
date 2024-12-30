const User = require("../model/userModel");
const { setUser } = require('../utils/authJwt');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

// Handler for user signup
async function signUpHandler(req, res) {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "User successfully signed up" });
    } catch (error) {
        console.error("Error during sign up:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Handler for user login
async function loginHandler(req, res) {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a token using setUser
        const token = setUser(user);

        // Set the token as an HTTP-only cookie
        return res
            .status(200)
            .cookie('token', token, {
                httpOnly: true, // Prevent access to the cookie via JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 2 * 24 * 60 * 60 * 1000, // 7 days expiration
            })
            .json({ token: token });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { signUpHandler, loginHandler };
