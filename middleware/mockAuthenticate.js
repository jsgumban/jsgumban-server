const mockAuthenticate = (req, res, next) => {
	req.user = {
		id: 'mockUserId',
		role: 'user'
	};
	next();
};

module.exports = mockAuthenticate;
