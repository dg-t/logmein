const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARE
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ROUTES
app.use('/api/v1/users', userRouter);

module.exports = app;
