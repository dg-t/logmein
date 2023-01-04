const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log(`Uncaught Exception. ${err.name}. ${err.message}`);
	process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./index');

mongoose.set('strictQuery', false);
(async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// eslint-disable-next-line no-console
		console.log('Connected to DB!!!');
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(`Connection to DB failed! err: ${err}`);
	}
})();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running: http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
	console.log(`Unhandled Rejection. ${err.name}. ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});
