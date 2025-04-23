### Backend README (`taskly-backend/README.md`)

```markdown
# Taskly Backend

Taskly Backend provides the API and business logic for user authentication and task management.

## Features
- User authentication (Login/Registration)
- Task management (CRUD operations)
- JWT-based authentication
- CORS handling

## Tech Stack
- **Framework**: Express.js
- **Database**: MongoDB (using Mongoose for data modeling)
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: Custom error handling and authentication middleware

## Setup & Installation

### 1. Clone the Repository
Clone the repository to your local machine:

```bash
git clone https://github.com/harisankar705/taskly-backend.git
cd taskly-backend
2. Install Dependencies
Run the following command to install the necessary dependencies:

bash
Copy
Edit
npm install
3. Configure Environment Variables
Create a .env file in the root of your project and add the following environment variables:

ini
Copy
Edit
PORT=5000                       # The port on which the backend will run
MONGO_URI=mongodb://your-mongo-connection   # MongoDB connection string
JWT_SECRET=your-jwt-secret       # Secret key for signing JWT tokens
FRONTEND_URL=https://taskly-frontend-mu.vercel.app   # Frontend URL (for CORS)
4. Running the Development Server
To start the backend in development mode, run:

bash
Copy
Edit
npm run dev
This will start the server and it should be accessible at http://localhost:5000.

5. Running in Production
Before running in production, make sure to build your TypeScript files:

bash
Copy
Edit
npm run build
After building, you can start the production server using:

bash
Copy
Edit
npm start
The server will run at http://localhost:5000 (or the port defined in .env).

API Endpoints
1. POST /login
Description: Login a user and return a JWT token for authentication.

Request:

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "password123"
}
Response:

json
Copy
Edit
{
  "token": "your-jwt-token"
}
2. POST /register
Description: Register a new user.

Request:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
Copy
Edit
{
  "message": "User registered successfully"
}
3. GET /tasks
Description: Get all tasks for the logged-in user.

Authorization: Bearer token required in headers.

Response:

json
Copy
Edit
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Task 1 description"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Task 2 description"
  }
]
4. POST /tasks
Description: Create a new task.

Request:

json
Copy
Edit
{
  "title": "New Task",
  "description": "Description of the new task"
}
Response:

json
Copy
Edit
{
  "message": "Task created successfully"
}
Middleware
Error Handling
Custom error handler middleware is implemented to catch and return errors from API requests.

Authentication Middleware
Authentication middleware is used to secure routes like /tasks. The middleware verifies the JWT token from request headers.

Deployment
You can deploy the backend to platforms like Render, Heroku, or DigitalOcean.

1. Render Deployment:
Connect your GitHub repository to Render.

Set the necessary environment variables (MONGO_URI, JWT_SECRET, FRONTEND_URL).

Deploy the app.

2. Heroku Deployment:
Push the backend code to a Heroku app.

Set the environment variables in the Heroku dashboard.

Deploy.

License
MIT License. See LICENSE for more information.

markdown
Copy
Edit

### How to Structure Your Repository

- For the **backend**:
taskly-backend/ ├── src/ │ ├── controllers/ │ ├── middleware/ │ ├── models/ │ ├── repositories/ │ ├── routes/ │ ├── services/ │ └── server.ts ├── .env ├── package.json └── tsconfig.json