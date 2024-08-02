const JWT = require('jsonwebtoken');

// Use environment variables for sensitive information
const secret = process.env.JWT_SECRET || 'default_secret'; // Ensure `JWT_SECRET` is set in your environment variables

// Create token with expiration and optional algorithm
function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };

    // Add expiration and algorithm options
    const options = {
        expiresIn: '1h', // Token expires in 1 hour, adjust as needed
        algorithm: 'HS256', // Default algorithm
    };

    const token = JWT.sign(payload, secret, options);
    return token;
}

// Validate token and handle errors
function validateToken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (error) {
        // Handle errors for invalid or expired tokens
        return null; // You can customize this as needed (e.g., throw an error or return specific messages)
    }
}

module.exports = {
    createTokenForUser,
    validateToken,
};
