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
	details: {
		type: String, // New field for additional details
		default: ''
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
		enum: ['personal', 'financing', 'payable', 'payable-due-1', 'payable-due-2', 'payable-due-3', 'payable-due-4'],
		required: true
	},
	parentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
		default: null
	},
	position: {
		type: Number,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = { Task };
