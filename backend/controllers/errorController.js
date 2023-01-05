const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `Duplicate Field vaule: ${value} Please enter a correct value`;
	return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		error: err,
		status: err.status,
		message: err.message,
		stack: err.stack,
		name: err.name,
	});
};

const sendErrorProd = (err, res) => {
	if (err.isOperationalError) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error('An error occurred: ', err);
		res.status(500).json({
			status: 'Error',
			message: 'Something went wrong',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'Error';

	if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
	else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		if (err.name === 'CastError') error = handleCastErrorDB(err);
		if (err.code === 11000) error = handleDuplicateFieldsDB(err);
		if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
		sendErrorProd(error, res);
	}
};
