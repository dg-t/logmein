const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// MIDDLEWARE
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`${req.originalUrl} This route does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
