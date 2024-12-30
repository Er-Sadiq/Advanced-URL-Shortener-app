const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Assuming User model exists

const secret = 'Project$2333@#YS'; // Keep the same secret for signing and verifying tokens

// Set the user in a JWT token
function setUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secret, { expiresIn: '2d' }); // Create a JWT with a 2-day expiry
}

// Get the user by verifying the JWT token
const getUser = async (token) => {
    try {
        const decoded = jwt.verify(token, secret); // Verify the token with the same secret used for signing
        // Optionally, fetch the user from the database if you need complete user data
        const user = await User.findById(decoded.id);  // Use decoded.id instead of decoded._id for consistency
        if (!user) {
            throw new Error('User not found');
        }
        return user;  // Return the user object found in the database
    } catch (error) {
        throw new Error('Invalid or expired token'); // More descriptive error message
    }
};

module.exports = { setUser, getUser };
