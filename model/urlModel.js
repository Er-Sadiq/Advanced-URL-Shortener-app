const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema(
  {
    longUrl: { type: String, required: true }, // Original URL
    shortId: { type: String, unique: true, required: true }, // Unique ID for the short URL
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created it
    hist: [
      {
        ts: { type: Number, required: true }, // Timestamps for visit history
      },
    ],
    totalClicks: { type: Number, default: 0 }, // Total number of clicks
    uniqueClicks: { type: Number, default: 0 }, // Total unique clicks
    uniqueUsers: { type: Number, default: 0 }, // Number of unique users
    clicksByDate: [
      {
        date: { type: Date, required: true }, // Specific date for tracking
        clicks: { type: Number, default: 0 }, // Clicks on that date
      },
    ],
    createdAt: { type: Date, default: Date.now }, // Date when the short URL was created
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

module.exports = mongoose.model('URL', URLSchema);
