require('dotenv').config();
const {  } = require('./db');
const path = require('path');
const exp = require('express');
// const bp = require('body-parser');
const { getAlcohol } = require('./api');
const app = exp();
const { PORT } = process.env;

app.listen(PORT, (err, data) => {
	if (err) {
		console.error(err);
	}
	console.log(`Listening on port ${PORT}`);
});

app.use(exp.json());

app.get('/', (req, res) => {
	res.sendFile(path.resolve('./client' + '/index.html'));
});

app.post('/api/drinks', (req, res) => {
	// res.send('POST REQUEST WORKS');
	getAlcohol(req.body).then((r) => {
		
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	})
	res.end();
});
