const express = require('express');
const router = express.Router();
const Account = require("../../models/bills/AccountModel");

router.post('/', async (req, res) => {
	try {
		const newAccount = await Account.create(req.body);
		res.status(201).send(newAccount);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.get('/', async (req, res) => {
	try {
		const accounts = await Account.find();
		res.status(200).send(accounts);
	} catch (error) {
		res.status(500).send(error);
	}
});


router.get('/:id', async (req, res) => {
	try {
		const account = await Account.findById(req.params.id);
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
		const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		console.log('bill', account);
		if (!account) {
			return res.status(404).send();
		}
		res.status(200).send(account);
	} catch (error) {
		console.log('error', error);
		res.status(400).send(error);
	}
});


router.delete('/:id', async (req, res) => {
	try {
		const account = await Account.findByIdAndDelete(req.params.id);
		if (!account) {
			return res.status(404).send();
		}
		res.status(200).send(account);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;