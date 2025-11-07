import authRouter from '../routes/auth.js';
import todoRouter from '../routes/todos.js';

const _routes = [
  ['/auth', authRouter],
  ['/todos', todoRouter],
];

export { _routes };
