/**
 * Todo Controller
 * Handles all todo-related business logic
 */

import * as TodoModel from '../models/Todo.js';
import { createError } from '../middleware/errorHandler.js';

/**
 * Create a new todo
 * POST /api/todos
 */
export const createTodo = (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = Number(req.user.id);

    // Create todo in model
    const todo = TodoModel.createTodo(userId, { title, description });

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all todos for the authenticated user
 * GET /api/todos
 */
export const getAllTodos = (req, res, next) => {
  try {
    const userId = Number(req.user.id);
    const userTodos = TodoModel.getTodosByUserId(userId);

    res.json({
      success: true,
      data: userTodos,
      count: userTodos.length,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a specific todo by ID
 * GET /api/todos/:id
 */
export const getTodoById = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user.id);

    const todo = TodoModel.getTodoById(userId, id);
    if (!todo) {
      return next(createError(404, 'Todo not found'));
    }

    res.json({
      success: true,
      data: todo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update specific fields of a todo (PATCH)
 * PATCH /api/todos/:id
 * Only updates fields provided in request body
 */
export const updateTodo = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user.id);
    const { title, description, completed } = req.body;

    // Check if todo exists
    const existingTodo = TodoModel.getTodoById(userId, id);
    if (!existingTodo) {
      return next(createError(404, 'Todo not found'));
    }

    // Build update object (only include provided fields)
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (completed !== undefined) updates.completed = completed;

    // Update todo
    const updatedTodo = TodoModel.updateTodo(userId, id, updates);

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a todo
 * DELETE /api/todos/:id
 */
export const deleteTodo = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user.id);

    // Check if todo exists
    const todo = TodoModel.getTodoById(userId, id);
    if (!todo) {
      return next(createError(404, 'Todo not found'));
    }

    // Delete todo
    TodoModel.deleteTodo(userId, id);

    res.json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
