require('dotenv').config();
const { getDrinks, saveDrink, saveCD, getCD, deleteDrink, changeDrinkData } = require('./db');
const path = require('path');
const exp = require('express');
const { getAlcohol } = require('./api');
const app = exp();
const { PORT } = process.env;
let drinkes = [];
app.set('view engine', 'ejs');

app.listen(PORT, (err, data) => {
	if (err) {
		console.error(err);
	}
	console.log(`Listening on port ${PORT}`);
});

app.use(exp.json());

app.get('/', (req, res) => {
	getDrinks().then((data) => {
		res.render('../client/index.ejs', { dat: data });
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	});
});

app.post('/api/drinks', (req, res) => {
	//getAlcohol is the API method
	//outputs r, the data retrieved from API
	console.log(req.body);
	res.send(getAlcohol(req.body).then((r) => {
		//saveDrink is the save method
		//should save r to database
		saveDrink(r)
			.then(() => {
				//confirmation the drink is saved in database
				console.log('saved');
				res.status(201).end();
			})
	}).catch((err) => {
		//if Drink fails to save.
		console.error(err);
		res.status(500).end();
	}));
});

app.post('/create/drinks', (req, res) => {
	//getAlcohol is the API method
	//outputs r, the data retrieved from API
	console.log(req.body);
	res.send(getAlcohol(req.body).then((r) => {
		//saveDrink is the save method
		//should save r to database
		saveDrink(r)
			.then(() => {
				//confirmation the drink is saved in database
				console.log('saved');
				res.status(201).redirect('/');
			})
	}).catch((err) => {
		//if Drink fails to save.
		console.error(err);
		res.status(500).end();
	}));
});

app.get('/create/drinks', (req, res) => {
	getCD().then((data) => {
		res.status(200).send(data);
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	});
});

app.post('/create/drinks', (req, res) => {
	//using saveCD instead to save into customDrink database
	saveCD(req.body)
	.then(() => {
		//confirmation the drink is saved in database
		console.log('saved custom drink!');
		res.status(201).end();
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	})
});
