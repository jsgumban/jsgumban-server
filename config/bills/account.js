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
				name: 'billGenerationDate',
				type: 'String',
				required: true,
				reactType: 'number',
				placeholder: 'Bill Generation Date',
				initialState: '',
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
				initialState: '',
			}
		],
		savings: [
			{
				name: 'totalOutstanding',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Total Outstanding',
				initialState: 0,
			},
		],
		cash: [
			{
				name: 'totalOutstanding',
				type: 'Number',
				default: 0,
				reactType: 'number',
				placeholder: 'Total Outstanding',
				initialState: 0,
			},
		],
		loan: [
			{
				name: 'loanAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Loan Amount',
				initialState: 0,
			},
			{
				name: 'interestRate',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Interest Rate',
				initialState: 0,
			},
			{
				name: 'loanTerm',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Loan Term (months)',
				initialState: 0,
			},
		]
	}
};

module.exports = account;
