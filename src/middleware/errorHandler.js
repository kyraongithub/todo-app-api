/**
 * Global Error Handler Middleware
 * Catches and formats all errors in a consistent way
 */

export const errorHandler = (err, req, res, next) => {
  // Default error response
  const status = err.status || 500
  const message = err.message || "Internal server error"

  console.error(`[ERROR] ${status}: ${message}`)
  console.error(err.stack)

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  })
}

/**
 * Create a custom error object
 * Usage: throw createError(400, 'Invalid input')
 */
export const createError = (status, message) => {
  const error = new Error(message)
  error.status = status
  return error
}
