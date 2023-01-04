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

	if (process.eventNames.NODE_ENV === 'development') sendErrorDev(err, res);
	else if (process.eventNames.NODE_ENV === 'production') {
		sendErrorProd(err, res);
	}
};
