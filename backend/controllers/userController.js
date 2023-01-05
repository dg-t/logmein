const User = require('../models/userModel');
const ctachAsync = require('../utils/catchAsync');

exports.getAllUsers = ctachAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: 'success',
		results: users.length,
		data: {
			users,
		},
	});
});

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
