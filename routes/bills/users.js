const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const BillUser = require("../../models/bills/UserModel");
const authenticate = require("../../middleware/authenticate");
const router = express.Router();


// Register a new user
router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
		const user = new BillUser({
			...req.body,
			password: hashedPassword,
		});
		const newUser = await user.save();
		res.status(201).send(newUser);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Authenticate user and generate JWT
router.post('/login', async (req, res) => {
	try {
		console.log('hello');
		const user = await BillUser.findOne({ username: req.body.username });
		console.log('userX: ', user);
		if (!user) {
			return res.status(400).send({ message: 'Invalid username or password' });
		}
		const isPasswordValid = await bcrypt.compareSync(req.body.password, user.password);
		if (!isPasswordValid) {
			return res.status(400).send({ message: 'Invalid username or password' });
		}
		const token = jwt.sign({ id: user._id, role: user.role }, 'secret-jsgumban', { expiresIn: '24h' });
		res.status(200).send({ token });
	} catch (error) {
		console.log('errorX: ', error);
		res.status(500).send(error);
	}
});


// Apply authentication middleware to the following routes
router.use(authenticate);

// CRUD routes for BillUser
router.get('/', async (req, res) => {
	try {
		const users = await BillUser.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const user = await BillUser.findById(req.params.id);
		if (!user) {
			return res.status(404).send();
		}
		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const updatedUser = await BillUser.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!updatedUser) {
			return res.status(404).send();
		}
		res.status(200).send(updatedUser);
	} catch (error) {
		res.status(400).send(error);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deletedUser = await BillUser.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).send();
		}
		res.status(200).send(deletedUser);
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
