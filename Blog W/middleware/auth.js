const { validateToken } = require("../service/auth");

function checkForAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        
        if (!tokenCookie) {
            // If no token cookie, just proceed to the next middleware
            return next();
        }
        
        try {
            const userPayLoad = validateToken(tokenCookie);
            req.user = userPayLoad;
            return next(); // Token is valid, proceed to the next middleware
        } catch (error) {
            // Handle the case where token validation fails
            console.error('Token validation failed:', error); // Log the error for debugging
            return next(); // Proceed to the next middleware, but handle it properly in the route
        }
    };
}

module.exports = {
    checkForAuthCookie,
};
