const taskModel = require('../models/task-model');
const taskService = require('../services/task-service');


exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    res.send(tasks);
    // console.log(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new taskModel(req.body);
    await task.save();//returns a promise, so we need to await it to ensure the task is saved before sending the response
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedTask = await taskService.updateTask(
            id,
            title,
            description
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
   
    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

exports.searchedTasks = async (req, res) => {
    try {
        const { q } = req.query;

        const tasks = await taskService.searchTasks(q);

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
