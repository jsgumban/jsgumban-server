const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://jsgumban:kgjIWNb69vreeprO@cluster0.tw8esq3.mongodb.net/finance_app?retryWrites=true&w=majority";
mongoose.connect(uri)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));


// Define a simple schema and model
const AccountSchema = new mongoose.Schema({
	accountGroup: String,
	accountName: String,
	accountAmount: Number,
	accountDescription: String,
});
const Account = mongoose.model('accounts', AccountSchema );

// CRUD routes here

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

app.post('/accounts', async (req, res) => {
	const newAccount = new Account(req.body);
	try {
		const savedAccount = await newAccount.save();
		res.status(201).json(savedAccount);
	} catch (err) {
		res.status(400).json(err);
	}
});


app.get('/accounts', async (req, res) => {
	try {
		const accounts = await Account.find();
		res.json(accounts);
	} catch (err) {
		res.status(500).json(err);
	}
});

app.put('/accounts/:id', async (req, res) => {
	try {
		const updatedAccount = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(updatedAccount);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

app.delete('/accounts/:id', async (req, res) => {
	try {
		await Account.findByIdAndDelete(req.params.id);
		res.json({ message: 'Deleted Successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});


const billRoutes = require('./routes/bills');
app.use('/bills', billRoutes);
