const express = require('express');
const router = express.Router();
const Account = require("../../models/bills/AccountModel");
const mockAuthenticate = require("../../middleware/mockAuthenticate");
const authenticate = require("../../middleware/authenticate");

// Apply mock authentication middleware for testing
router.use(authenticate);

router.post('/', async (req, res) => {
	try {
		req.body.userId = req.user.id; // Add userId to the account data
		const newAccount = await Account.create(req.body);
		res.status(201).send(newAccount);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const accounts = await Account.find({ userId: req.user.id });
		res.status(200).send(accounts);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
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
		res.status(400).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
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
