const express = require('express');
const router = express.Router();
const accountConfig = require('../../config/bills/account');
const transactionConfig = require('../../config/bills/transaction');

const accounts = require('./accounts');
const transactions = require('./transactions');

const Account = require("../../models/bills/AccountModel");


router.get('/config', async (req, res) => {
	const transactionAccount = transactionConfig.find(x => x.name == 'transactionAccountId');
	let accounts = await Account.find()
	accounts = accounts.map(({type, bank, name, id}) => ({type, bank, name, id}));
	transactionAccount.source = accounts;
	
	res.json({
		accounts: accountConfig,
		transactions: transactionConfig,
	});
});

router.use('/accounts',  accounts);
router.use('/transactions',  transactions);

module.exports = router;