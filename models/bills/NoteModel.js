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
		enum: ['financing', 'payable'], // Define possible types
		default: 'payable'
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = { Note };
