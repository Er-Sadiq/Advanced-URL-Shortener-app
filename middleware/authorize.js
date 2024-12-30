const { getUser } = require("../utils/authJwt");

async function restrictToLoggedinUserOnly(req, res, next) {
  const authHeader = req.headers['authorization']; // Get the Authorization header

  // Check if the Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Extract the token from the Authorization header (format: "Bearer <token>")
  const token = authHeader.split(' ')[1]; // Split the header to get the token

  // If no token is present after the "Bearer" word
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }

  try {
    const user = await getUser(token); // Decodes and validates the token

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

async function checkAuth(req, res, next) {
  const authHeader = req.headers['authorization']; // Get the Authorization header

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token) {
      try {
        const user = await getUser(token); // Decodes and validates the token
        req.user = user; // Attach the user to the request object
      } catch (error) {
        req.user = null; // If the token is invalid, set user to null
      }
    }
  }

  next(); // Continue to the next middleware or route handler
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
