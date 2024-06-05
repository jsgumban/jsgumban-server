const express = require('express');
const router = express.Router();
const { getModelByType } = require("../../models/bills/AccountModel");
const authenticate = require("../../middleware/authenticate");

// Apply authentication middleware
router.use(authenticate);

router.post('/', async (req, res) => {
	try {
		req.body.userId = req.user.id; // Add userId to the account data
		const Account = getModelByType(req.body.typeId); // Get the model based on the typeId
		const newAccount = await Account.create(req.body);
		res.status(201).send(newAccount);
	} catch (error) {
		console.error('Error creating account:', error);
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const Account = getModelByType('default'); // Use the default schema to fetch accounts
		const accounts = await Account.find({ userId: req.user.id });
		res.status(200).send(accounts);
	} catch (error) {
		console.error('Error fetching accounts:', error);
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const Account = getModelByType('default'); // Use the default schema for fetching a single account
		const account = await Account.findOne({ _id: req.params.id, userId: req.user.id });
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
		const Account = getModelByType(req.body.typeId); // Ensure we use the correct model based on typeId
		const account = await Account.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			req.body,
			{ new: true, runValidators: true }
		);
		if (!account) {
			return res.status(404).send();
		}
		res.status(200).send(account);
	} catch (error) {
		console.error('Error updating account:', error);
		res.status(400).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const Account = getModelByType('default'); // Use the default schema for deleting an account
		const account = await Account.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
		if (!account) {
			return res.status(404).send();
		}
		res.status(200).send(account);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
