const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./index');

dotenv.config({ path: './config.env' });

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
app.listen(port, () => {
	console.log(`App running: http://localhost:${port}`);
});
