// models/GamblingTransactionModel.js

const mongoose = require('mongoose');

const gamblingTransactionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillUser',
		required: true
	},
	result: {
		type: String,
		enum: ['win', 'lose'],
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now,
		required: true
	}
});

const GamblingTransaction = mongoose.model('GamblingTransaction', gamblingTransactionSchema);

module.exports = GamblingTransaction;
