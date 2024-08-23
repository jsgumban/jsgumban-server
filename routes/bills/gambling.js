const express = require('express');
const router = express.Router();
const GamblingTransaction = require("../../models/bills/GamblingTransactionModel");
const authenticate = require("../../middleware/authenticate");

// Middleware for authentication
router.use(authenticate);

// Create a gambling transaction (win/lose)
router.post('/', async (req, res) => {
	try {
		const gamblingTransaction = new GamblingTransaction({
			userId: req.user.id,
			result: req.body.result,
			amount: req.body.amount,
			timestamp: req.body.timestamp || Date.now()
		});
		
		await gamblingTransaction.save();
		res.status(201).json(gamblingTransaction);
	} catch (error) {
		res.status(400).json({ error: 'Failed to create transaction', details: error });
	}
});

// Get all gambling transactions for a user
router.get('/', async (req, res) => {
	try {
		const transactions = await GamblingTransaction.find({ userId: req.user.id });
		res.status(200).json(transactions);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch transactions', details: error });
	}
});

// Update a gambling transaction
router.patch('/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['result', 'amount', 'timestamp']; // Allowed fields to be updated
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
	
	if (!isValidOperation) {
		return res.status(400).json({ error: 'Invalid updates' });
	}
	
	try {
		const gamblingTransaction = await GamblingTransaction.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			req.body,
			{ new: true, runValidators: true }
		);
		
		if (!gamblingTransaction) {
			return res.status(404).json({ error: 'Transaction not found' });
		}
		
		res.status(200).json(gamblingTransaction);
	} catch (error) {
		res.status(400).json({ error: 'Failed to update transaction', details: error });
	}
});

// Delete a gambling transaction
router.delete('/:id', async (req, res) => {
	try {
		const gamblingTransaction = await GamblingTransaction.findOneAndDelete({
			_id: req.params.id,
			userId: req.user.id
		});
		
		if (!gamblingTransaction) {
			return res.status(404).json({ error: 'Transaction not found' });
		}
		
		res.status(200).json({ message: 'Transaction deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete transaction', details: error });
	}
});

module.exports = router;
