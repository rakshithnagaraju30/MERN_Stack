const taskModel = require("../models/task-model");

const searchTasks = async (search) => {
    try {
        if (!search || search.trim() === "") {
            return await taskModel.find();
        }

        return await taskModel.find({
            $or: [
                {
                    title: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: search.trim(),
                        $options: "i"
                    }
                }
            ]
        });
    } catch (error) {
        throw error;
    }
};

const updateTask = async (id, title, description) => {
    const updatedTask = await taskModel.findByIdAndUpdate(
        id,
        {
            title,
            description
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedTask) {
        throw new Error("Task not found");
    }

    return updatedTask;
};

module.exports = {
    searchTasks,
    updateTask
};