# Node.js Backend API

A robust, production-ready Node.js backend built with Express.js featuring JWT authentication and a complete To-Do management API.

## Project Structure

\`\`\`
src/
├── server.js # Main application entry point
├── config/ # Configuration files
├── middleware/
│ ├── auth.js # JWT token verification
│ ├── errorHandler.js # Global error handling
│ └── validation.js # Input validation rules
├── routes/
│ ├── auth.js # Authentication endpoints
│ └── todos.js # Todo CRUD endpoints
├── controllers/
│ ├── authController.js # Auth business logic
│ └── todoController.js # Todo business logic
├── models/
│ ├── User.js # User data model
│ └── Todo.js # Todo data model
└── utils/
├── jwt.js # JWT token utilities
└── password.js # Password hashing utilities
\`\`\`

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd nodejs-backend-api
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Setup environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Edit `.env` and update with your values

## Quick Start

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

### Production Mode

\`\`\`bash
npm start
\`\`\`

The server will start on `http://localhost:3001`

## API Endpoints

### Authentication

#### Register

\`\`\`http
POST /api/auth/register
Content-Type: application/json

{
"name": "John Doe",
"email": "john@example.com",
"password": "securepassword123"
}
\`\`\`

#### Login

\`\`\`http
POST /api/auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "securepassword123"
}
\`\`\`

#### Get Current User

\`\`\`http
GET /api/auth/me
Authorization: Bearer <your_jwt_token>
\`\`\`

### Todos

#### Create Todo

\`\`\`http
POST /api/todos
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
"title": "Buy groceries",
"description": "Milk, eggs, bread"
}
\`\`\`

#### Get All Todos

\`\`\`http
GET /api/todos
Authorization: Bearer <your_jwt_token>
\`\`\`

#### Get Todo by ID

\`\`\`http
GET /api/todos/:id
Authorization: Bearer <your_jwt_token>
\`\`\`

#### Update Todo (PATCH - partial update)

\`\`\`http
PATCH /api/todos/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
"title": "Buy groceries and vegetables",
"completed": true
}
\`\`\`

#### Delete Todo

\`\`\`http
DELETE /api/todos/:id
Authorization: Bearer <your_jwt_token>
\`\`\`

## Key Features

✅ **JWT Authentication** - Secure token-based authentication with expiry
✅ **Input Validation** - Comprehensive validation using express-validator
✅ **Error Handling** - Centralized error handling with consistent response format
✅ **Middleware Architecture** - Clean separation of concerns
✅ **CORS Support** - Cross-origin resource sharing configured
✅ **In-Memory Storage** - Ready for database integration
✅ **Password Hashing** - Secure password storage with bcryptjs
✅ **Modular Structure** - Easy to extend and maintain

## Development Notes

### Authentication Flow

1. User registers with name, email, password
2. Password is hashed and stored securely
3. User logs in with email and password
4. Server validates credentials and returns JWT token
5. Client stores token and includes it in Authorization header for protected routes
6. Server verifies token on each protected request

### Todo Management

- Todos are scoped to users (multi-tenant ready)
- PATCH method allows partial updates
- All timestamps are ISO 8601 format
- Validation prevents invalid data

### Extending the Backend

**Add Database Integration:**

- Replace in-memory models with database queries
- Update User.js and Todo.js with actual database operations

**Add Refresh Tokens:**

- Implement token refresh endpoint
- Use refreshToken from generateTokenPair()

**Add Rate Limiting:**

- Install express-rate-limit
- Apply middleware to authentication routes

**Add Logging:**

- Install winston or morgan
- Replace console.log with proper logging

## Environment Variables

| Variable    | Description                          | Default               |
| ----------- | ------------------------------------ | --------------------- |
| PORT        | Server port                          | 3001                  |
| NODE_ENV    | Environment (development/production) | development           |
| JWT_SECRET  | Secret key for signing JWT           | -                     |
| JWT_EXPIRY  | Token expiration time                | 24h                   |
| CORS_ORIGIN | Allowed CORS origin                  | http://localhost:5173 |

## Error Handling

All errors follow a consistent format:
\`\`\`json
{
"success": false,
"message": "Error description",
"errors": [] // Validation errors if applicable
}
\`\`\`

## License

MIT
