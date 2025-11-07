/**
 * Authentication Controller
 * Handles login and registration logic
 */

import { createUser, findUserByEmail } from "../models/User.js"
import { comparePassword } from "../utils/password.js"
import { generateToken } from "../utils/jwt.js"
import { createError } from "../middleware/errorHandler.js"

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = findUserByEmail(email)
    if (existingUser) {
      return next(createError(409, "Email already registered"))
    }

    // Create new user
    const user = await createUser({ name, email, password })

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = findUserByEmail(email)
    if (!user) {
      return next(createError(401, "Invalid credentials"))
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
      return next(createError(401, "Invalid credentials"))
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    })

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get current user profile
 * GET /api/auth/me
 * Requires valid JWT token
 */
export const getCurrentUser = (req, res) => {
  // req.user is set by verifyToken middleware
  res.json({
    success: true,
    data: req.user,
  })
}
