/**
 * Authentication Routes
 * Handles user registration, login, and profile endpoints
 */

import express from 'express';
import {
  register,
  login,
  getCurrentUser,
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import {
  loginValidation,
  registerValidation,
  handleValidationErrors,
} from '../middleware/validation.js';

const authRouter = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { name, email, password }
 */
authRouter.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  register
);

/**
 * POST /api/auth/login
 * Login an existing user
 * Body: { email, password }
 */
authRouter.post('/login', loginValidation, handleValidationErrors, login);

/**
 * GET /api/auth/me
 * Get current authenticated user profile
 * Headers: Authorization: Bearer <token>
 */
authRouter.get('/me', verifyToken, getCurrentUser);

export default authRouter;
