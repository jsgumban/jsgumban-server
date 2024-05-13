const banks = require('../../data/accounts/banks.json');
const accountTypes = require('../../data/accounts/types.json');
const repeatOptions = require('../../data/accounts/repeat-options.json');

const account = [
	{
		name: 'typeId',
		type: 'String',
		required: false,
		reactType: 'select',
		placeholder: 'Account Type',
		step: 1,
		source: accountTypes,
		initialState: '', // Assuming a default empty value to indicate no selection
	},
	{
		name: 'name',
		type: 'String',
		required: true,
		reactType: 'text',
		placeholder: 'Account Name',
		step: 1,
		initialState: '', // Empty string for text input
	},
	{
		name: 'bankId',
		type: 'String',
		required: true,
		reactType: 'select',
		placeholder: 'Bank',
		step: 1,
		source: banks,
		initialState: '',
	},
	{
		name: 'accountNumber',
		type: 'String',
		required: true,
		reactType: 'text',
		placeholder: 'Account Number',
		step: 1,
		initialState: '', // Empty string for text input
	},
	{
		name: 'creditLimit',
		type: 'Number',
		default: 0,
		reactType: 'number',
		placeholder: 'Credit Limit',
		step: 1,
		initialState: 0, // Default number
	},
	{
		name: 'totalOutstanding',
		type: 'Number',
		default: 0,
		reactType: 'number',
		placeholder: 'Total Outstanding',
		step: 1,
		initialState: 0, // Default number
	},
	{
		name: 'annualFeeGenerationDate',
		type: 'Date',
		required: true,
		reactType: 'date',
		placeholder: 'Annual Fee Generation Date',
		step: 2,
		initialState: '', // Empty string or a specific date format
	},
	{
		name: 'annualFee',
		type: 'Number',
		default: 0,
		reactType: 'number',
		placeholder: 'Annual Fee',
		step: 2,
		initialState: 0, // Default number
	},
	{
		name: 'billGenerationDate',
		type: 'String',
		required: true,
		reactType: 'number',
		placeholder: 'Bill Generation Date',
		step: 2,
		initialState: '', // Empty string or a specific date format
	},
	{
		name: 'billRepeatOptionId',
		type: 'String',
		required: true,
		reactType: 'select',
		placeholder: 'Bill Repeat Option',
		step: 2,
		source: repeatOptions,
		initialState: ''
	},
	{
		name: 'billDueDate',
		type: 'String',
		required: true,
		reactType: 'number',
		placeholder: 'Bill Due Date',
		step: 2,
		initialState: '', // Empty string or a specific date format
	},
	{
		name: 'includeBalanceInNetWorth',
		type: 'Boolean',
		default: false,
		reactType: 'checkbox',
		placeholder: 'Include Balance in Net Worth',
		step: 2,
		initialState: false, // Boolean
	},
];

module.exports = account;
