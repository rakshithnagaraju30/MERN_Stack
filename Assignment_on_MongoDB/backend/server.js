const express = require('express');
const dotenv = require('dotenv');
const DBConnection = require('./databaseConnection');
const taskRoutes = require('./routes/task-route');
const cors = require('cors');

const { setServers } = require("node:dns");
setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

// Allow requests specifically from your React/frontend port
app.use(cors({ origin: 'https://todomakeapp.netlify.app' }));

const PORT = 4000;

app.use(express.json());
app.use('/api/tasks', taskRoutes);

dotenv.config();
DBConnection();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


