const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillUser',
		required: true
	},
	text: {
		type: String,
		required: true
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
		enum: ['financing', 'payable'],
		required: true
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
		default: null // NULL for top-level tasks
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };
