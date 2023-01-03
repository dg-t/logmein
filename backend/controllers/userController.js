exports.getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not ready!!',
	});
};

exports.getUser = (req, res) => {
	//   console.log(req.params.id);
	res.status(500).json({
		status: 'error',
		message: 'This route is not ready!',
	});
};

exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'Error',
		message: 'This route is not ready!',
	});
};

exports.updateUser = (req, res) => {
	res.status(500).json({
		status: 'Error',
		message: 'This route is not ready!',
	});
};

exports.deleteUser = (req, res) => {
	res.status(500).json({
		status: 'Error',
		message: 'This route is not ready!',
	});
};

exports.isValidID = (req, res, next, val) => {
	console.log(`val is the ID parameter: ${val}`);
	next();
	// Check if ID is valid
};

exports.isValidBody = (req, res, next) => {
	console.log(`Data to post: ${req.body}`);
	// Check if body is valid (for post req)
	next();
};
