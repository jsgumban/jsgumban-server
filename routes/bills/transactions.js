const express = require('express');
const router = express.Router();
const Transaction = require("../../models/bills/TransactionModel");

router.post('/', async (req, res) => {
	try {
		const newAccount = await Transaction.create(req.body);
		res.status(201).send(newAccount);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const bills = await Transaction.find();
		res.status(200).send(bills);
	} catch (error) {
		res.status(500).send(error);
	}
});


router.get('/:id', async (req, res) => {
	try {
		const account = await Transaction.findById(req.params.id);
		if (!account) {
			return res.status(404).send();
		}
		res.status(200).send(account);
	} catch (error) {
		res.status(500).send(error);
	}
});


router.patch('/:id', async (req, res) => {
	try {
		// Find the transaction by ID and update it with the new data
		const transaction = await Transaction.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		
		// If no transaction is found, return a 404 response
		if (!transaction) {
			return res.status(404).send({ message: 'Transaction not found' });
		}
		
		// Return the updated transaction
		res.status(200).send(transaction);
	} catch (error) {
		// Log the error and return a 400 response with the error message
		console.error('Error updating transaction:', error);
		res.status(400).send({ error: 'Failed to update transaction', details: error });
	}
});


router.delete('/:id', async (req, res) => {
	try {
		const account = await Transaction.findByIdAndDelete(req.params.id);
		console.log('accountX: ', account);
		if (!account) {
			return res.status(404).send();
		}
		res.status(200).send(account);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;