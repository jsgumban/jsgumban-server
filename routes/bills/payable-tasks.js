const express = require('express');
const router = express.Router();
const { PayableTask } = require('../../models/bills/PayableTaskModel');
const authenticate = require('../../middleware/authenticate');

router.use(authenticate);

/**
 * @route   GET /bills/payable-task
 * @desc    Get payable tasks
 * @access  Private
 */
router.get('/', async (req, res) => {
	try {
		const { taskType } = req.query;
		const tasks = await PayableTask.find({ userId: req.user.id, taskType })
			.populate('accountId', 'name accountNumber') // Fetch account details
			.sort({ position: 1 });
		
		res.status(200).send(tasks);
	} catch (error) {
		console.error('Error fetching payable tasks:', error);
		res.status(500).send(error);
	}
});

/**
 * @route   POST /bills/payable-task
 * @desc    Create a new payable task
 * @access  Private
 */
router.post('/', async (req, res) => {
	try {
		const { text, accountId, dueDate, amount, notes, rollable, isExpense, taskType } = req.body;
		
		// if (!text || !accountId || !dueDate || !amount || !taskType) {
		// 	return res.status(400).send({ error: 'Missing required fields' });
		// }
		
		const lastTask = await PayableTask.findOne({ userId: req.user.id, taskType })
			.sort({ position: -1 });
		
		const newPosition = lastTask ? lastTask.position + 1 : 1;
		
		const newTask = await PayableTask.create({
			userId: req.user.id,
			accountId,
			text,
			dueDate,
			amount,
			notes,
			rollable,
			isExpense,
			checked: false,
			important: false,
			taskType,
			position: newPosition
		});
		
		res.status(201).send(newTask);
	} catch (error) {
		console.error('Error creating payable task:', error);
		res.status(400).send(error);
	}
});

/**
 * @route   PATCH /bills/payable-task/:id
 * @desc    Update a payable task
 * @access  Private
 */
router.patch('/:id', async (req, res) => {
	try {
		const { text, accountId, dueDate, amount, notes, rollable, isExpense, checked, important } = req.body;
		
		const updatedTask = await PayableTask.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			{
				text,
				accountId,
				dueDate,
				amount,
				notes,
				rollable,
				isExpense,
				checked,
				important
			},
			{ new: true, runValidators: true }
		);
		
		if (!updatedTask) return res.status(404).send({ error: 'Task not found' });
		
		res.status(200).send(updatedTask);
	} catch (error) {
		console.error('Error updating payable task:', error);
		res.status(400).send(error);
	}
});


/**
 * @route   DELETE /bills/payable-task/:id
 * @desc    Delete a payable task
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
	try {
		await PayableTask.deleteOne({ _id: req.params.id, userId: req.user.id });
		res.status(200).send({ message: 'Task deleted successfully' });
	} catch (error) {
		console.error('Error deleting payable task:', error);
		res.status(500).send(error);
	}
});

module.exports = router;
