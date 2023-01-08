const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const { I18n } = require('i18n');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const getHomePage = require('./controllers/homeController');

const i18n = new I18n({
	locales: ['en', 'it'],
	directory: `${__dirname}/locales`,
	defaultLocale: 'en',
});

const app = express();

app.use(i18n.init);

// MIDDLEWARE
// HTTP Security
app.use(helmet());

// login info during development
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// limit requests
const appLimiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many request. Try again in one hour',
});
const loginLimiter = rateLimit({
	max: 5,
	windowMs: 30 * 60 * 1000,
	message: 'Too many request. Try again in 30 min',
});
app.use('/api', appLimiter);
app.use('/api/v1/users/login', loginLimiter);

// Read data from body - we limit to 10 kb (optional)
app.use(express.json({ limit: '10kb' }));

// Data sanitization
app.use(mongoSanitize()); // NoSQL query injection
app.use(xss()); // Cross-Site Scripting

/*
 * Prevent parameter pollution - will only allow one URL parameter (last one) removing duplicates
 * If need to allow URL parameters to be repeated for certain parameter, need to whitelist parameters
 * To whitelist parameter: app.use(hpp({whitelist: ['paramName1', 'paramName2']}));
 */
app.use(hpp());

// Serve static files
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.route('/api/v1/home').get(getHomePage);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`${req.originalUrl} This route does not exist`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
