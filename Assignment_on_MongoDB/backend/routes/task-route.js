const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, searchedTasks} = require('../controllers/task-controller');


const router = express.Router();

router.get('/', getTasks);

router.post('/', createTask);

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

router.get('/search', searchedTasks);

module.exports = router;
