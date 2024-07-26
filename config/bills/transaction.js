const categories = require('../../data/transactions/transaction-categories.json');
const repeatOptions = require('../../data/transactions/transaction-repeat-options.json');
const transactionTypes = require('../../data/transactions/transaction-types.json');

const transaction = {
	common: [
		{
			name: 'transactionTypeId',
			type: 'String',
			required: true,
			reactType: 'select',
			placeholder: 'Transaction Type',
			source: transactionTypes,
			initialState: ''
		},
		{
			name: 'transactionDate',
			type: 'Date',
			required: true,
			reactType: 'date',
			placeholder: 'Transaction Date',
			initialState: '',
		},
		{
			name: 'transactionAccountId',
			type: 'String',
			required: true,
			reactType: 'select',
			placeholder: 'Account',
			source: [], // Dynamically populated based on user accounts
			initialState: '',
		},
		{
			name: 'transactionAmount',
			type: 'Number',
			required: true,
			reactType: 'number',
			placeholder: 'Amount',
			initialState: 0,
		},
	],
	types: {
		transfer: [
			{
				name: 'destinationAccountId',
				type: 'String',
				required: true,
				reactType: 'select',
				placeholder: 'Destination Account',
				source: [], // Dynamically populated based on user accounts
				initialState: '',
			}
		],
		installment: [
			{
				name: 'installmentCount',
				type: 'Number',
				required: false,
				reactType: 'number',
				placeholder: 'Number of Installments',
				initialState: null,
			},
			{
				name: 'installmentStartDate',
				type: 'Date',
				required: false,
				reactType: 'date',
				placeholder: 'Installment Start Date',
				initialState: '',
			}
		],
		repeat: [
			{
				name: 'repeatTransactionId',
				type: 'String',
				required: false,
				reactType: 'select',
				placeholder: 'Repeat Transaction',
				source: repeatOptions,
				initialState: '',
			}
		],
		expense: [
			{
				name: 'expenseCategoryId',
				type: 'String',
				required: true,
				reactType: 'select',
				placeholder: 'Expense Category',
				source: categories, // Dynamically populated based on expense categories
				initialState: '',
			}
		],
		income: [],
		investment: [
			{
				name: 'investmentTypeId',
				type: 'String',
				required: true,
				reactType: 'select',
				placeholder: 'Investment Type',
				source: [], // Dynamically populated based on investment types
				initialState: '',
			}
		],
		loan_payment: [
			{
				name: 'loanPaymentAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Loan Payment Amount',
				initialState: 0,
			}
		],
		bill_payment: [
			{
				name: 'relatedTransactionId',
				type: 'String',
				required: false,
				reactType: 'select',
				initialState: '',
				hidden: true
			},
		],
		refund: [],
		donation: [
			{
				name: 'donationAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Donation Amount',
				initialState: 0,
			}
		],
		salary: [
			{
				name: 'salaryAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Salary Amount',
				initialState: 0,
			}
		],
		dividend: [
			{
				name: 'dividendAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Dividend Amount',
				initialState: 0,
			}
		],
		expense_reimbursement: [
			{
				name: 'reimbursementAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Reimbursement Amount',
				initialState: 0,
			}
		],
		savings: [
			{
				name: 'savingsAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Savings Amount',
				initialState: 0,
			}
		],
		credit_card_expense: [
			{
				name: 'relatedTransactionId',
				type: 'String',
				required: false,
				initialState: '',
				hidden: true
			},
			{
				name: 'paymentDate',
				type: 'Date',
				required: false,
				initialState: '',
				hidden: true,
			},
			{
				name: 'paid',
				type: 'Boolean',
				required: false,
				initialState: false,
				hidden: true,
			},
		],
		
		credit_card_out: [
			{
				name: 'relatedTransactionId',
				type: 'String',
				required: false,
				initialState: '',
				hidden: true
			},
			{
				name: 'paymentDate',
				type: 'Date',
				required: false,
				initialState: '',
				hidden: true,
			},
			{
				name: 'paid',
				type: 'Boolean',
				required: false,
				initialState: false,
				hidden: true,
			},
		],
		credit_card_in: [
			{
				name: 'relatedTransactionId',
				type: 'String',
				required: false,
				initialState: '',
				hidden: true
			},
			{
				name: 'paymentDate',
				type: 'Date',
				required: false,
				initialState: '',
				hidden: true,
			},
			{
				name: 'paid',
				type: 'Boolean',
				required: false,
				initialState: false,
				hidden: true,
			},
		],
		financing_partial: [
			{
				name: 'totalTransactionAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Total Amount',
				initialState: 0,
				hidden: true
			},
			{
				name: 'transactionNote',
				type: 'String',
				placeholder: 'Notes',
				required: false,
				initialState: '',
			},
		],
		financing_out: [
			{
				name: 'interestRate',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Interest Rate',
				initialState: 0,
			},
			{
				name: 'serviceFee',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Service Fee',
				initialState: 0,
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
				name: 'totalTransactionAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Total Amount',
				initialState: 0,
			},
			{
				name: 'transactionNote',
				type: 'String',
				placeholder: 'Notes',
				required: false,
				initialState: '',
			},
			{
				name: 'transactionProof',
				type: 'String',
				placeholder: 'Proof',
				required: false,
				initialState: '',
			},
			{
				name: 'paid',
				type: 'Boolean',
				required: false,
				initialState: false,
				hidden: true,
			},
			{
				name: 'paymentDate',
				type: 'Date',
				required: false,
				initialState: '',
				hidden: true,
			},
			{
				name: 'relatedTransactionId',
				type: 'String',
				required: false,
				initialState: '',
				hidden: true
			},
			
		],
		financing_in: [
			{
				name: 'totalTransactionAmount',
				type: 'Number',
				required: true,
				reactType: 'number',
				placeholder: 'Total Amount',
				initialState: 0,
			},
			{
				name: 'relatedTransactionId',
				type: 'String',
				required: false,
				initialState: '',
				hidden: true
			},
			{
				name: 'transactionInstallmentId',
				type: 'String',
				required: false,
				initialState: '',
				hidden: true
			},
			{
				name: 'transactionNote',
				type: 'String',
				placeholder: 'Notes',
				required: false,
				initialState: '',
				hidden: true,
			},
		],
		
	}
};

module.exports = transaction;
