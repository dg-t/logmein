const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');

const jwtSign = (id) =>
	jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

const createSendToken = (user, statusCode, res, sendUser) => {
	const token = jwtSign(user._id);

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: sendUser ? { user } : undefined,
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		// passwordChangedAt: req.body.passwordChangedAt,
		role: req.body.role,
	});

	createSendToken(newUser, 201, res, true);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new AppError('Please provide email and password.', 400));

	const user = await User.findOne({ email }).select('+password');
	if (!user || !(await user.verifyPassword(password, user.password)))
		return next(new AppError('Invalid credentials.', 401));

	createSendToken(user, 201, res);
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
	// const currentUser = await User.findById(decoded.id).select('-password');
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

exports.restrict =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role))
			return next(new AppError('You do not have permissions.', 403));
		next();
	};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return next(new AppError('Email was not found.', 404));

	const resetToken = user.createPwResetToken();
	await user.save({ validateBeforeSave: false });
	// await user.save({ validateModifiedOnly: true });

	const resetURL = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/users/resetPassword/${resetToken}`;
	const message = `Forgot your password? Please go to the following URL to reset your password: ${resetURL}. 
		\nIf you did not forgot your password, please ignore this email.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset (valid for 5 min)',
			message,
		});

		res.status(200).json({
			status: 'success',
			message: 'Token sent succesfully',
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		// await user.save({ validateModifiedOnly: true });

		return next(
			new AppError(
				'Something went wrong sending the reset password email. Try again later.',
				500
			)
		);
	}
});
exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) return next(new AppError('Invalid token.', 400));
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');
	if (!user) return next(new AppError('User not found.', 404));

	if (!(await user.verifyPassword(req.body.currentPassword, user.password)))
		return next(new AppError('Your password is wrong.', 401));

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	createSendToken(user, 200, res);
});
