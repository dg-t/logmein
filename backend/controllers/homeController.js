module.exports = (req, res, next) => {
	res.status(200).json({
		status: 'success',
		message: 'Home Page render',
	});
};
