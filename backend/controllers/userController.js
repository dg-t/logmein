const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const ctachAsync = require('../utils/catchAsync');

const filterDataToUpdate = (dataToUpdate, ...allowFields) => {
	const updatedFields = {};
	Object.keys(dataToUpdate).forEach((el) => {
		if (allowFields.includes(el)) updatedFields[el] = dataToUpdate[el];
	});
	return updatedFields;
};

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

exports.updateUser = ctachAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm)
		return next(
			new AppError(
				'The password cannot be updated from this route. Please use /updatePassword',
				400
			)
		);

	const dataToUpdate = filterDataToUpdate(req.body, 'name', 'email');
	const updatedUser = await User.findByIdAndUpdate(req.user.id, dataToUpdate, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'Success',
		data: {
			user: updatedUser,
		},
	});
});

exports.inactivateUser = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(204).json({
		status: 'success',
		data: 'null',
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) return next(new AppError('No user was found.', 404));

	await user.remove();

	res.status(204).json({
		status: 'success',
		data: 'null',
	});
});

exports.getUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message: 'This route is not ready!',
	});
};
