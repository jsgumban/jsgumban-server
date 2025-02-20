const express = require('express');
const router = express.Router();
const { Task } = require('../../models/bills/TaskModel');
const authenticate = require('../../middleware/authenticate');

router.use(authenticate);

/**
 * @route   GET /bills/tasks
 * @desc    Get all tasks, including subtasks, sorted by parent-child relationship
 * @access  Private
 */
router.get('/', async (req, res) => {
	try {
		// Fetch tasks for the user, sorted by parentId & timestamp
		const { taskType } = req.query;
		const tasks = await Task.find({ userId: req.user.id, taskType: taskType }).sort({ parentId: 1, timestamp: -1 });
		
		// Organize tasks with subtasks
		const taskMap = {};
		tasks.forEach(task => (taskMap[task._id] = { ...task._doc, subtasks: [] }));
		
		// Assign subtasks to their parents
		const rootTasks = [];
		tasks.forEach(task => {
			if (task.parentId) {
				if (taskMap[task.parentId]) {
					taskMap[task.parentId].subtasks.push(taskMap[task._id]);
				}
			} else {
				rootTasks.push(taskMap[task._id]);
			}
		});
		
		res.status(200).send(rootTasks);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res.status(500).send(error);
	}
});

/**
 * @route   POST /bills/tasks
 * @desc    Create a new task (or subtask if parentId is provided)
 * @access  Private
 */
router.post('/', async (req, res) => {
	try {
		const { text, taskType, parentId } = req.body;
		if (!text || !taskType) return res.status(400).send({ error: 'Task text and type are required' });
		
		const newTask = await Task.create({
			userId: req.user.id,
			text,
			checked: false,
			important: false,
			taskType,
			parentId: parentId || null // NULL for main tasks
		});
		
		res.status(201).send(newTask);
	} catch (error) {
		console.error('Error creating task:', error);
		res.status(400).send(error);
	}
});

/**
 * @route   PATCH /bills/tasks/:id
 * @desc    Update a task (text, status, importance, or parent)
 * @access  Private
 */
router.patch('/:id', async (req, res) => {
	try {
		const updatedTask = await Task.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			{
				text: req.body.text,
				checked: req.body.checked,
				important: req.body.important,
				parentId: req.body.parentId || null // Allows re-parenting
			},
			{ new: true, runValidators: true }
		);
		
		if (!updatedTask) return res.status(404).send({ error: 'Task not found' });
		
		res.status(200).send(updatedTask);
	} catch (error) {
		console.error('Error updating task:', error);
		res.status(400).send(error);
	}
});

/**
 * @route   DELETE /bills/tasks/:id
 * @desc    Delete a task and its subtasks
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
	try {
		// Find task
		const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
		if (!task) return res.status(404).send({ error: 'Task not found' });
		
		// Delete task and its subtasks
		await Task.deleteMany({ $or: [{ _id: req.params.id }, { parentId: req.params.id }] });
		
		res.status(200).send({ message: 'Task and subtasks deleted successfully' });
	} catch (error) {
		console.error('Error deleting task:', error);
		res.status(500).send(error);
	}
});

module.exports = router;
