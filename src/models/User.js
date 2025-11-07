/**
 * User Model
 * In-memory storage for users (for testing purposes)
 * In production, replace with database calls
 */

import { hashPassword } from '../utils/password.js';

// In-memory user storage
const users = [];

/**
 * Create a new user
 */
export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);

  const user = {
    id: users.length + 1,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

/**
 * Find user by email
 */
export const findUserByEmail = (email) => {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

/**
 * Find user by ID
 */
export const findUserById = (id) => {
  return users.find((u) => u.id === id);
};

/**
 * Get all users (without passwords)
 */
export const getAllUsers = () => {
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
  }));
};
