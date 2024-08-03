const { validateToken } = require("../service/auth");

// Middleware to check for authentication token cookie
function checkForAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        
        if (!tokenCookie) {
            // If no token cookie, just proceed to the next middleware
            return next();
        }

        try {
            // Validate the token and get the payload
            const userPayload = validateToken(tokenCookie);
            
            if (userPayload) {
                // Attach user information to the request object
                req.user = userPayload;
            } else {
                // Handle invalid token case
                console.warn('Invalid token detected'); // Log warning
                res.clearCookie(cookieName); // Clear the invalid cookie
            }
        } catch (error) {
            // Handle the case where token validation fails
            console.error('Token validation failed:', error); // Log the error for debugging
            res.clearCookie(cookieName); // Clear the invalid cookie
        }

        // Proceed to the next middleware
        next();
    };
}

module.exports = {
    checkForAuthCookie,
};
