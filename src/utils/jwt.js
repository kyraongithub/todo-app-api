/**
 * JWT Utilities
 * Helper functions for token generation and management
 */

import jwt from "jsonwebtoken"

/**
 * Generate a JWT token for a user
 * @param {Object} payload - Data to encode in the token
 * @returns {string} - Signed JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "24h",
  })
}

/**
 * Generate both access and refresh token pairs
 * Useful for implementing token refresh logic in future
 * @param {Object} user - User object with id and email
 * @returns {Object} - { accessToken, refreshToken }
 */
export const generateTokenPair = (user) => {
  const accessToken = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
    type: "access",
  })

  // Refresh token with longer expiry (implementation for future)
  const refreshToken = jwt.sign(
    {
      id: user.id,
      type: "refresh",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  )

  return { accessToken, refreshToken }
}
