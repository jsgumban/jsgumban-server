const express = require('express');
const router = express.Router();
const Transaction = require("../../models/bills/TransactionModel");
const authenticate = require("../../middleware/authenticate");
const mockAuthenticate = require("../../middleware/mockAuthenticate");

router.use(authenticate);

router.post('/', async (req, res) => {
	try {
		req.body.userId = req.user.id; // Add userId to the transaction data
		const newTransaction = await Transaction.create(req.body);
		res.status(201).send(newTransaction);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const transactions = await Transaction.find({ userId: req.user.id });
		res.status(200).send(transactions);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.user.id });
		if (!transaction) {
			return res.status(404).send();
		}
		res.status(200).send(transaction);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const transaction = await Transaction.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			req.body,
			// { new: true, runValidators: true }
		);
		
		console.log('transactionX: ', transaction);
		if (!transaction) {
			return res.status(404).send({ message: 'Transaction not found' });
		}
		res.status(200).send(transaction);
	} catch (error) {
		res.status(400).send({ error: 'Failed to update transaction', details: error });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
		if (!transaction) {
			return res.status(404).send();
		}
		res.status(200).send(transaction);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
