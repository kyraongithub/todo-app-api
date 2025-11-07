/**
 * Input Validation Middleware
 * Validates request data before processing
 */

import { validationResult, body } from "express-validator"

/**
 * Middleware to check validation results
 * If validation fails, returns 400 with error details
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    })
  }
  next()
}

// ============================================
// VALIDATION RULES
// ============================================

/**
 * Login validation rules
 */
export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required").trim().toLowerCase(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]

/**
 * Register validation rules
 */
export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email").isEmail().withMessage("Valid email is required").trim().toLowerCase(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]

/**
 * Todo creation validation rules
 */
export const todoValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
]

/**
 * Todo update validation rules
 */
export const todoUpdateValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
  body("completed").optional().isBoolean().withMessage("Completed must be a boolean value"),
]
