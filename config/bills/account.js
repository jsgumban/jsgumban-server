const banks = require('../../data/accounts/account-banks.json');
const accountTypes = require('../../data/accounts/account-types.json');
const repeatOptions = require('../../data/accounts/account-repeat-options.json');

const account = {
	common: [
		{
			name: 'typeId',
			type: 'String',
			required: true,
			reactType: 'select',
			placeholder: 'Account Type',
			source: accountTypes,
			initialState: '', // Assuming a default empty value to indicate no selection
		},
		{
			name: 'name',
			type: 'String',
			required: true,
			reactType: 'text',
			placeholder: 'Account Name',
			initialState: '', // Empty string for text input
		},
		{
			name: 'bankId',
			type: 'String',
			required: true,
			reactType: 'select',
			placeholder: 'Bank',
			source: banks,
			initialState: '',
		},
		{
			name: 'accountNumber',
			type: 'String',
			required: true,
			reactType: 'text',
			placeholder: 'Account Number',
			initialState: '', // Empty string for text input
		}
	],
	types: {
		credit_card: [
			{
				name: 'creditLimit',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Credit Limit',
				initialState: 0, // Default number
			},
			{
				name: 'totalOutstanding',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Total Outstanding',
				initialState: 0, // Default number
			},
			{
				name: 'annualFeeGenerationDate',
				type: 'Date',
				required: true,
				reactType: 'date',
				placeholder: 'Annual Fee Generation Date',
				initialState: '', // Empty string or a specific date format
			},
			{
				name: 'annualFee',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Annual Fee',
				initialState: 0, // Default number
			},
			{
				name: 'billGenerationDate',
				type: 'String',
				required: true,
				reactType: 'number',
				placeholder: 'Bill Generation Date',
				initialState: '', // Empty string or a specific date format
			},
			{
				name: 'billRepeatOptionId',
				type: 'String',
				required: true,
				reactType: 'select',
				placeholder: 'Bill Repeat Option',
				source: repeatOptions,
				initialState: ''
			},
			{
				name: 'billDueDate',
				type: 'String',
				required: true,
				reactType: 'number',
				placeholder: 'Bill Due Date',
				initialState: '', // Empty string or a specific date format
			}
		],
		savings: [
			{
				name: 'totalOutstanding',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Total Outstanding',
				initialState: 0, // Default number
			},
		],
		cash: [
			{
				name: 'totalOutstanding',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Total Outstanding',
				initialState: 0, // Default number
			},
		]
	}
};

module.exports = account;
