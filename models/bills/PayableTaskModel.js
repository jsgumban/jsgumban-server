const mongoose = require('mongoose');

const PayableTaskSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillUser',
		required: true
	},
	accountId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillAccount',
		required: true
	},
	text: {
		type: String,
		required: false
	},
	dueDate: {
		type: Date,
		required: false
	},
	amount: {
		type: Number,
		required: true
	},
	notes: {
		type: String,
		default: ''
	},
	rollable: {
		type: Boolean,
		default: false
	},
	isExpense: {
		type: Boolean,
		default: true
	},
	checked: {
		type: Boolean,
		default: false
	},
	important: {
		type: Boolean,
		default: false
	},
	taskType: {
		type: String,
		enum: ['payable', 'payable-due-1', 'payable-due-2', 'payable-due-3', 'payable-due-4'],
		required: true
	},
	position: {
		type: Number,
		required: false
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const PayableTask = mongoose.model('PayableTask', PayableTaskSchema);
module.exports = { PayableTask };
