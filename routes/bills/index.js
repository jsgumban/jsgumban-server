const express = require('express');
const router = express.Router();
const accountConfig = require('../../config/bills/account');

const accounts = require('./accounts');
const transactions = require('./transactions');
const users = require('./users'); // Import the users routes
const gambling = require('./gambling'); // Import the gambling routes
const notes = require('./notes'); // Import the gambling routes
const tasks = require('./tasks'); // Import the gambling routes
const payableTasks = require('./payable-tasks'); // Import the gambling routes

const Account = require("../../models/bills/AccountModel");
const transactionsConfig = require("../../config/bills/transaction");
const accountConfigs = require('../../config/bills/account');
const gamblingConfig = require('../../config/bills/gambling'); // Import gambling transaction config

const categories = require('../../data/transactions/transaction-categories.json');
const repeatOptions = require('../../data/transactions/transaction-repeat-options.json');
const transactionTypes = require('../../data/transactions/transaction-types.json');

const accountTypes = require('../../data/accounts/account-types.json');
const banks = require('../../data/accounts/account-banks.json');
const authenticate = require("../../middleware/authenticate");
const { getModelByType } = require("../../models/bills/AccountModel");


router.use('/accounts', accounts);
router.use('/transactions', transactions);
router.use('/users', users); // Use the users routes
router.use('/gambling', gambling);
router.use('/notes', notes);
router.use('/tasks', tasks);
router.use('/payable-tasks', payableTasks);



router.use(authenticate);
router.get('/config', async (req, res) => {
	try {
		// Fetch accounts from the database
		const Account = getModelByType('default'); // Assuming 'default' is the generic type for listing
		let accounts = await Account.find({ userId: req.user.id });
		
		accounts = accounts.map((account) => {
			const id = account.get('id');
			const accountNumber = account.get('accountNumber');
			const typeId = account.get('typeId');
			const bank = account.get('bank');
			let name = account.get('name');
			
			if (accountNumber) {
				name = name + " (" + accountNumber + ")";
			}
			
			return { typeId, bank, name, id }
		});
		
		// Update the source for transactionAccountId in the common fields
		const updatedCommonFields = transactionsConfig.common.map(field => {
			if (field.name === 'transactionAccountId' || field.name === 'incomeSourceId' || field.name === 'sourceAccountId') {
				return { ...field, source: accounts };
			}
			return field;
		});
		
		// Update the source for transactionAccountId in type-specific fields (if any)
		const updatedTypeFields = Object.entries(transactionsConfig.types).reduce((acc, [type, fields]) => {
			acc[type] = fields.map(field => {
				if (field.name === 'transactionAccountId' || field.name === 'destinationAccountId'  || field.name === 'incomeSourceId' || field.name === 'sourceAccountId') {
					return { ...field, source: accounts };
				}
				return field;
			});
			return acc;
		}, {});
		
		// Add gambling transaction fields to the updated configuration
		const gamblingFields = gamblingConfig.common.map(field => {
			if (field.name === 'transactionAccountId') {
				return { ...field, source: accounts };
			}
			return field;
		});
		
		// Add gambling transactions to the types
		updatedTypeFields.gambling = gamblingFields;
		
		// Create the updated configuration
		const updatedConfig = {
			common: updatedCommonFields,
			types: updatedTypeFields,
		};
		
		res.json({
			transactions: updatedConfig,
			categories,
			repeatOptions,
			transactionTypes,
			accounts: accountConfigs,
			accountTypes,
			banks
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
