const categories = require('../../data/transactions/categories.json');
const repeatOptions = require('../../data/transactions/repeat-options.json');
const transactionTypes = require('../../data/transactions/transaction-types.json');

const transaction = [
	{
		name: 'transactionTypeId',
		type: 'String',
		required: true,
		reactType: 'select',
		placeholder: 'Transaction Type',
		step: 1,
		source: transactionTypes,
		initialState: ''
	},
	{
		name: 'transactionDate',
		type: 'Date',
		required: true,
		reactType: 'date',
		placeholder: 'Transaction Date',
		step: 1,
		initialState: '',
	},
	{
		name: 'transactionAmount',
		type: 'Number',
		required: true,
		reactType: 'number',
		placeholder: 'Amount',
		step: 1,
		initialState: 0,
	},
	{
		name: 'transactionAccountId',
		type: 'String',
		required: true,
		reactType: 'select',
		placeholder: 'Account',
		step: 1,
		source: 'Dynamically populated based on user accounts',
		initialState: '',
	},
	{
		name: 'transactionNote',
		type: 'String',
		required: false,
		reactType: 'textarea',
		placeholder: 'Note',
		step: 1,
		initialState: '',
	},
	
	
	{
		name: 'transactionType',
		type: 'String',
		required: true,
		reactType: 'select',
		placeholder: 'Transaction Type',
		step: 2,
		source: [
			{ id: 'installment', name: 'Installment' },
			{ id: 'repeat', name: 'Repeat Transaction' }
		],
		initialState: 'none',
	},
	{
		name: 'transactionCategoryId',
		type: 'String',
		required: false,
		reactType: 'select',
		placeholder: 'Category',
		step: 2,
		source: categories,
		initialState: ''
	},
	
	{
		name: 'repeatTransactionId',
		type: 'String',
		required: false,
		reactType: 'select',
		placeholder: 'Repeat Transaction',
		step: 2,
		source: repeatOptions,
		initialState: '',
	},
	{
		name: 'installmentCount',
		type: 'Number',
		required: false,
		reactType: 'number',
		placeholder: 'Number of Installments',
		step: 2,
		initialState: null,
	},
	{
		name: 'installmentStartDate',
		type: 'Date',
		required: false,
		reactType: 'date',
		placeholder: 'Installment Start Date',
		step: 2,
		initialState: '',
	},
	
]

module.exports = transaction;