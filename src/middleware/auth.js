/**
 * Authentication Middleware
 * Handles JWT token verification and user authentication
 */

import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token from Authorization header
 * Expects: Authorization: Bearer <token>
 * Sets req.user with decoded token data if valid
 */
export const verifyToken = (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          'No token provided. Please include Authorization header with Bearer token.',
      });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      ...decoded,
      id: Number(decoded.id),
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    return res.status(403).json({
      success: false,
      message: 'Invalid or malformed token.',
    });
  }
};
