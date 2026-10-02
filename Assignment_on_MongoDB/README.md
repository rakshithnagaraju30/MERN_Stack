# To-Do App

A simple MERN stack to-do application for managing daily tasks. The app consists of a Node.js/Express backend connected to MongoDB and a React frontend for displaying tasks.

## Features
- View all tasks from the database
- Add new tasks through the API
- Update existing tasks
- Delete tasks
- Responsive and modern React UI

## Tech Stack
- Frontend: React, React Router, CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Development tools: Nodemon, dotenv

## Project Structure

```text
to-do-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── databaseConnection.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── README.md
└── package-lock.json (if present)
```

## Prerequisites
Before running this project, make sure you have installed:
- Node.js (v18 or above recommended)
- npm
- MongoDB database (local or Atlas)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd to-do-app
```

### 2. Configure environment variables
Create a `.env` file in the `backend` folder and add your MongoDB connection string:

```env
URL=mongodb://localhost:27017/to-do-app
```

If you are using MongoDB Atlas, use your connection string instead:

```env
URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/to-do-app
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Start the backend server
```bash
npm run dev
```

The backend will run on:
```text
http://localhost:4000
```

### 5. Install frontend dependencies
Open a new terminal and run:
```bash
cd frontend
npm install
```

### 6. Start the React frontend
```bash
npm start
```

The React app will run on:
```text
http://localhost:3000
```

## API Endpoints
The backend exposes the following task routes:

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

Example task object:

```json
{
  "name": "Complete assignment",
  "completionTime": "10:00 AM"
}
```

## Notes
- The frontend is configured with a proxy to `http://localhost:4000`, so API requests from the React app work without CORS issues.
- If MongoDB is not connected, the backend will throw an error and the app will not function correctly until the connection string is valid.

## License
This project is for educational purposes and is intended for learning MERN stack development.

## Author
Rakshith
