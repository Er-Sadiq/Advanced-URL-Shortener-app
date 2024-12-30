const express = require('express');
const databaseConnection = require('./model/connection');
const authRoute = require('./routes/auth');
const urlsRoute = require('./routes/urls');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Used for parsing incoming JSON requests

// Default route
app.get('/', (req, res) => {
    res.status(200).send(`Server is up and running, listening on port ${port}`);
});

// API Routes
app.use('/api/auth', authRoute);
app.use('/api', urlsRoute);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Async function to connect to MongoDB and start server
(async () => {
    try {
        await databaseConnection('mongodb+srv://srk6697:BY5ubFM8mqiuDusC@urlcluster.dqz8f.mongodb.net/?retryWrites=true&w=majority&appName=urlCluster'); // Connect to MongoDB
        console.log('MongoDB Connected');
        
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the app if MongoDB connection fails
    }
})();

// BY5ubFM8mqiuDusC
// srk6697