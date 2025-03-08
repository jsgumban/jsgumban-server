const express = require('express');
const router = express.Router();
const { Task } = require('../../models/bills/TaskModel');
const authenticate = require('../../middleware/authenticate');

router.use(authenticate);

/**
 * @route   GET /bills/tasks
 * @desc    Get tasks, ordered by position
 * @access  Private
 */
router.get('/', async (req, res) => {
	try {
		const { taskType } = req.query;
		const tasks = await Task.find({ userId: req.user.id, taskType })
			.sort({ position: 1 });
		
		res.status(200).send(tasks);
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res.status(500).send(error);
	}
});

/**
 * @route   POST /bills/tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post('/', async (req, res) => {
	try {
		const { text, details, taskType, parentId } = req.body;
		if (!text || !taskType) return res.status(400).send({ error: 'Task text and type are required' });
		
		const lastTask = await Task.findOne({ userId: req.user.id, taskType })
			.sort({ position: -1 });
		
		const newPosition = lastTask ? lastTask.position + 1 : 1;
		
		const newTask = await Task.create({
			userId: req.user.id,
			text,
			details: details || '',
			checked: false,
			important: false,
			taskType,
			parentId: parentId || null,
			position: newPosition
		});
		
		res.status(201).send(newTask);
	} catch (error) {
		console.error('Error creating task:', error);
		res.status(400).send(error);
	}
});

/**
 * @route   PATCH /bills/tasks/reorder
 * @desc    Reorder tasks and update their positions in bulk
 * @access  Private
 */
router.patch('/reorder', async (req, res) => { // ✅ Ensure this route comes **before** `/:id`
	try {
		const { reorderedTasks } = req.body; // Array of { _id, position }
		
		// Validate input
		if (!Array.isArray(reorderedTasks) || reorderedTasks.length === 0) {
			return res.status(400).send({ error: 'Invalid task order data' });
		}
		
		// Bulk update task positions
		const bulkOps = reorderedTasks.map(task => ({
			updateOne: {
				filter: { _id: task._id, userId: req.user.id },
				update: { position: task.position }
			}
		}));
		
		await Task.bulkWrite(bulkOps);
		
		res.status(200).send({ message: 'Tasks reordered successfully' });
	} catch (error) {
		console.error('Error reordering tasks:', error);
		res.status(500).send(error);
	}
});



/**
 * @route   PATCH /bills/tasks/reorder
 * @desc    Reorder tasks
 * @access  Private
 */
router.patch('/:id', async (req, res) => {
	try {
		const updatedTask = await Task.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			{
				text: req.body.text,
				details: req.body.details || '', // Allow details update
				checked: req.body.checked,
				important: req.body.important
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
		await Task.deleteMany({ $or: [{ _id: req.params.id }, { parentId: req.params.id }] });
		res.status(200).send({ message: 'Task and subtasks deleted successfully' });
	} catch (error) {
		console.error('Error deleting task:', error);
		res.status(500).send(error);
	}
});

module.exports = router;
