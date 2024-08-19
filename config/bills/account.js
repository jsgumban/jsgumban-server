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
			initialState: '',
		},
		{
			name: 'name',
			type: 'String',
			required: true,
			reactType: 'text',
			placeholder: 'Account Name',
			initialState: '',
		},
	],
	types: {
		credit_card: [
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
				initialState: '',
			},
			{
				name: 'creditLimit',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Credit Limit',
				initialState: 0,
			},
			{
				name: 'totalOutstanding',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Total Outstanding',
				initialState: 0,
			},
			{
				name: 'annualFeeGenerationDate',
				type: 'Date',
				required: true,
				reactType: 'date',
				placeholder: 'Annual Fee Generation Date',
				initialState: '',
			},
			{
				name: 'annualFee',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Annual Fee',
				initialState: 0,
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
				type: 'Number',  // Ensure billDueDate is now a number
				required: true,
				reactType: 'number',  // Ensure the input field is number-based
				placeholder: 'Bill Due Date',
				initialState: 1,  // Initial state as 1 or whatever fits
			}
		],
		loan: [
			{
				name: 'transactionStartDate',
				type: 'Date',
				required: true,
				reactType: 'date',
				placeholder: 'Transaction Start Date',
				initialState: '',
			},
			{
				name: 'billRepeatOptionId',
				type: 'String',
				required: true,
				reactType: 'select',
				placeholder: 'Bill Repeat Option',
				source: repeatOptions,
				initialState: 'monthly'
			},
			{
				name: 'installmentMonths',
				type: 'Number',
				required: false,
				reactType: 'number',
				placeholder: 'Installment Months',
				initialState: 0,
			},
			{
				name: 'billDueDate',
				type: 'Number',  // Ensure billDueDate is now a number
				required: true,
				reactType: 'number',  // Ensure the input field is number-based
				placeholder: 'Bill Due Date',
				initialState: 1,  // Initial state as 1 or whatever fits
			},
			{
				name: 'amortization',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Amortization',
				initialState: 0,
			},
			{
				name: 'transactionNote',
				type: 'String',
				placeholder: 'Notes',
				required: false,
				initialState: '',
				reactType: 'textarea'
			},
		]
	}
};

module.exports = account;
