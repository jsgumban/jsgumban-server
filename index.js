const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Enable CORS for specific origins
app.use(cors({
	origin: ['http://localhost:3000', 'http://192.168.0.44:3000', 'https://www.jsgumban.com'],
	methods: ['GET', 'POST'],
	credentials: true
}));
app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://jsgumban:kgjIWNb69vreeprO@cluster0.tw8esq3.mongodb.net/finance_app?retryWrites=true&w=majority";
mongoose.connect(uri)
	.then(async () => {
		console.log('MongoDB Connected');
	})
	.catch(err => console.log(err));

// HTTP server and Socket.IO setup
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: ['http://localhost:3000', 'http://192.168.0.44:3000', 'https://www.jsgumban.com'],
		methods: ['GET', 'POST'],
		credentials: true
	}
});

// Socket.IO connection handler
io.on('connection', (socket) => {
	console.log('A user connected');
	
	// Handle moveCard events from clients
	socket.on('moveCard', (data) => {
		const { fromListId, toListId, cardId } = data;
		console.log(`Card ${cardId} moved from List ${fromListId} to List ${toListId}`);
		
		// Broadcast the moveCard event to other clients
		socket.broadcast.emit('cardMoved', data);
	});
	
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
});

// Basic API endpoint
app.get('/', (req, res) => {
	res.send('API is running');
});

// Import routes
const billRoutes = require('./routes/bills');
app.use('/bills', billRoutes);

// Start the server on port 5001 (or specified port) and allow access from network
server.listen(port, '0.0.0.0', () => {
	console.log(`Server running on port ${port}`);
});
