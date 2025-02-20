const express = require('express');
const router = express.Router();
const { Note } = require("../../models/bills/NoteModel");
const authenticate = require("../../middleware/authenticate");

// Apply authentication middleware
router.use(authenticate);

/**
 * @route   POST /bills/notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', async (req, res) => {
	try {
		const noteData = {
			userId: req.user.id,
			content: req.body.content,
			noteType: req.body.noteType || 'general', // Default to 'general' if not provided
			timestamp: new Date()
		};
		
		const newNote = await Note.create(noteData);
		res.status(201).send(newNote);
	} catch (error) {
		console.error('Error creating note:', error);
		res.status(400).send(error);
	}
});

/**
 * @route   GET /bills/notes
 * @desc    Get all notes for the logged-in user
 * @access  Private
 */
router.get('/', async (req, res) => {
	try {
		const notes = await Note.find({ userId: req.user.id }).sort({ timestamp: -1 });
		res.status(200).send(notes);
	} catch (error) {
		console.error('Error fetching notes:', error);
		res.status(500).send(error);
	}
});

/**
 * @route   GET /bills/notes/:id
 * @desc    Get a single note by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
	try {
		const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
		if (!note) {
			return res.status(404).send();
		}
		res.status(200).send(note);
	} catch (error) {
		res.status(500).send(error);
	}
});

/**
 * @route   PATCH /bills/notes/:id
 * @desc    Update a note
 * @access  Private
 */
router.patch('/:id', async (req, res) => {
	try {
		const updatedNote = await Note.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user.id },
			{
				content: req.body.content,
				noteType: req.body.noteType || 'general',
				timestamp: new Date()
			},
			{ new: true, runValidators: true }
		);
		
		if (!updatedNote) {
			return res.status(404).send();
		}
		res.status(200).send(updatedNote);
	} catch (error) {
		console.error('Error updating note:', error);
		res.status(400).send(error);
	}
});

/**
 * @route   DELETE /bills/notes/:id
 * @desc    Delete a note
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
	try {
		const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
		if (!deletedNote) {
			return res.status(404).send();
		}
		res.status(200).send(deletedNote);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
