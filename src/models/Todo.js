/**
 * Todo Model
 * In-memory storage for todos
 * Structure allows grouping by user ID for multi-user support
 */

// In-memory todo storage: { userId -> [todos] }
const todos = {};

/**
 * Create a new todo for a user
 */
export const createTodo = (userId, todoData) => {
  userId = Number(userId);

  // Initialize user's todo array if not exists
  if (!todos[userId]) {
    todos[userId] = [];
  }

  const todo = {
    id: todos[userId].length + 1,
    userId,
    title: todoData.title,
    description: todoData.description || '',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  todos[userId].push(todo);
  return todo;
};

/**
 * Get all todos for a user
 */
export const getTodos = () => todos;

/**
 * Get all todos for a user
 */
export const getTodosByUserId = (userId) => {
  userId = Number(userId);
  return todos[userId] || [];
};

/**
 * Get a specific todo by ID
 */
export const getTodoById = (userId, todoId) => {
  userId = Number(userId);
  todoId = Number(todoId);
  if (!todos[userId]) return null;
  return todos[userId].find((t) => t.id === todoId);
};

/**
 * Update a specific todo
 * Only updates fields that are provided
 */
export const updateTodo = (userId, todoId, updates) => {
  userId = Number(userId);
  todoId = Number(todoId);
  if (!todos[userId]) return null;

  const todoIndex = todos[userId].findIndex((t) => t.id === todoId);
  if (todoIndex === -1) return null;

  const todo = todos[userId][todoIndex];
  const updatedTodo = {
    ...todo,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  todos[userId][todoIndex] = updatedTodo;
  return updatedTodo;
};

/**
 * Delete a specific todo
 */
export const deleteTodo = (userId, todoId) => {
  userId = Number(userId);
  todoId = Number(todoId);
  if (!todos[userId]) return false;

  const initialLength = todos[userId].length;
  todos[userId] = todos[userId].filter((t) => t.id !== todoId);

  return todos[userId].length < initialLength;
};

/**
 * Delete all todos for a user (useful for cleanup)
 */
export const deleteUserTodos = (userId) => {
  userId = Number(userId);
  delete todos[userId];
};
