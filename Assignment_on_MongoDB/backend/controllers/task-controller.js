const taskModel = require('../models/task-model');



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
    const id = req.params.id;
    const updatedData = req.body;

    const task = await taskModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task
    });

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