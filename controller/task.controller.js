const Task = require("../model/Task");
const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete }); 
        await newTask.save();
        res.status(200).json({ status: 'ok', data: newTask });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: "ok", data: taskList });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

taskController.putTask = async (req, res) => {
    try {
        const { id, task, isComplete } = req.body;  // req.body에서 ID 포함하여 받기


        const updateTask = await Task.updateOne(
            { _id: id },
            { task, isComplete }
        );

        if (updateTask.nModified === 0) {
            return res.status(404).json({ status: 'fail', message: 'Task not found or no changes made' });
        }

        res.status(200).json({ status: 'ok', message: 'Task updated successfully' });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};

taskController.delTask = async (req, res) => {
    try {
        const  id  = req.params.id;

        const delTask = await Task.deleteOne({ _id: id });

        if (delTask.deletedCount === 0) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }

        res.status(200).json({ status: 'ok', message: 'Task deleted successfully' });
    } catch (err) {
        res.status(400).json({ status: 'fail', error: err });
    }
};
module.exports = taskController;
