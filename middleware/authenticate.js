const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
	const token = req.header('Authorization')?.replace('Bearer ', '');
	if (!token) {
		return res.status(401).send({ message: 'Access denied. No token provided.' });
	}
	try {
		const decoded = jwt.verify(token, 'secret-jsgumban');
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send({ message: 'Invalid token.' });
	}
};

module.exports = authenticate;
