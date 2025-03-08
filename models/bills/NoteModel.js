const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BillUser',
		required: true
	},
	content: {
		type: String,
		required: true
	},
	noteType: {
		type: String,
		enum: ['personal', 'financing', 'payable', 'payable-due-1', 'payable-due-2', 'payable-due-3', 'payable-due-4'],
		default: 'payable'
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = { Note };
