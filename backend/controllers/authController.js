const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const jwtSign = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		passwordChangedAt: req.body.passwordChangedAt,
	});

	const token = jwtSign(newUser._id);

	res.status(201).json({
		status: 'success',
		token,
		data: {
			user: newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError('Please provide email and password.', 400));

	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.verifyPassword(password, user.password)))
		return next(new AppError('Incorrect email or password.', 401));

	const token = jwtSign(user._id);

	res.status(200).json({
		status: 'success',
		token,
	});
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) return next(new AppError('Please log in to get access.', 401));
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	if (!currentUser)
		return next(
			new AppError('The user belonging to this token no longer exist.', 401)
		);

	if (currentUser.passwordModifiedAfterJWT(decoded.iat))
		return next(
			new AppError('Your password was changed. Please log in again.', 401)
		);

	req.user = currentUser;
	next();
});
