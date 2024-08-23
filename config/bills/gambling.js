// config/bills/gambling-transaction.js

const gamblingTransactionConfig = {
	common: [
		{
			name: 'result',
			type: 'String',
			required: true,
			reactType: 'select',
			placeholder: 'Win/Lose',
			options: ['win', 'lose'],
			initialState: 'win',
		},
		{
			name: 'amount',
			type: 'Number',
			required: true,
			reactType: 'number',
			placeholder: 'Amount',
			initialState: 0,
		},
		{
			name: 'timestamp',
			type: 'Date',
			required: true,
			reactType: 'date',
			placeholder: 'Timestamp',
			initialState: new Date(),
			hidden: true,
		}
	]
};

module.exports = gamblingTransactionConfig;
