/**
 * Todo Routes
 * Handles all todo CRUD operations
 */

import express from 'express';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';
import { verifyToken } from '../middleware/auth.js';
import {
  todoValidation,
  todoUpdateValidation,
  handleValidationErrors,
} from '../middleware/validation.js';

const todoRouter = express.Router();

// All todo routes require authentication
todoRouter.use(verifyToken);

/**
 * POST /api/todos
 * Create a new todo
 * Body: { title, description? }
 */
todoRouter.post('/', todoValidation, handleValidationErrors, createTodo);

/**
 * GET /api/todos
 * Get all todos for the authenticated user
 */
todoRouter.get('/', getAllTodos);

/**
 * GET /api/todos/:id
 * Get a specific todo by ID
 */
todoRouter.get('/:id', getTodoById);

/**
 * PATCH /api/todos/:id
 * Update specific fields of a todo
 * Body: { title?, description?, completed? }
 */
todoRouter.patch(
  '/:id',
  todoUpdateValidation,
  handleValidationErrors,
  updateTodo
);

/**
 * DELETE /api/todos/:id
 * Delete a todo
 */
todoRouter.delete('/:id', deleteTodo);

export default todoRouter;
