require('dotenv').config();
const exp = require('express');
const app = exp();
const { PORT } = process.env;

app.listen(PORT, (err, data) => {
	if (err) {
		console.error(err);
	}
	console.log(`Listening on port ${PORT}`);
});
