const dotenv = require('dotenv');
const app = require('./index');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`App running: http://localhost:${port}`);
});
