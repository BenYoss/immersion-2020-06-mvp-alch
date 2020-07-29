require('dotenv').config();
const path = require('path');
const exp = require('express');
//-----------------------------------------------------------------------------------------
//|Required methods from external files
const { getDrinks, saveDrink, saveCD, getCD, deleteDrink, changeDrinkData, getDrink } = require('./db');
const { getAlcohol } = require('./api');
//-----------------------------------------------------------------------------------------
const app = exp();
const { PORT } = process.env;
let drinkes = [];
let user;
app.set('view engine', 'ejs');

app.listen(PORT, (err, data) => {
	if (err) {
		console.error(err);
	}
	console.log(`Listening on port ${PORT}`);
});

app.use(exp.json());

app.get('/', (req, res) => {
		getDrinks(user).then((data) => {
			res.render('../client/index.ejs', { dat: data, user: user });
		}).catch((err) => {
			console.error(err);
			res.status(500).end();
		});
});

app.get('/create', (req, res) => {
	res.render('../client/create.ejs', {});
})

app.post('/user', (req, res) => {
	user = req.body.username;
	res.redirect("/");
})

let idStorage = '';

app.get('/edit', (req, res) => {
	// console.log(idStorage);
	getDrink({ idDrink: idStorage }).then((data) => {
		res.render('../client/edit.ejs', { dat: data });
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	});
})

app.post('/edit', (req, res) => {
	console.log(idStorage, "id <---");
	getDrink(req.body).then((data) => {
		idStorage = data.idDrink;
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	});
})

app.get('/error'), (req, res) => {
	res.send("request failed: it does not seem like that drink is recorded in our databases. If you'd like, add the drink you are looking for into our systems to prevent this issue happening to another user. Thanks. --Barbase team")
}

app.post('/api/drinks', (req, res) => {
	//getAlcohol is the API method
	//outputs r, the data retrieved from API
	// console.log(req.body.username, req.body.drinkname);
	res.send(getAlcohol(req.body.drinkname).then((r) => {
		//saveDrink is the save method
		//should save r to database
		let ing = [];
		let mea = [];
		console.log(r);
		if(r) {
			Object.keys(r).forEach((elt) => {
				//iterate over each ingredient/measurement and record in array
				if (elt.includes("Ingredient") && r[`${elt}`] !== null) {
					ing.push(r[`${elt}`]);
				}
				if (elt.includes("Measure") && r[`${elt}`] !== null) {
					mea.push(r[`${elt}`]);
				}
			});
			r['strIngredient'] = ing;
			r['strMeasure'] = mea
			r['username'] = req.body.username;
			console.log(r);
			saveDrink(r)
				.then(() => {
					//confirmation the drink is saved in database
					console.log('saved');
					res.status(201).end();
				})
		}
	}).catch((err) => {
		//if Drink fails to save.
		console.error(err);
		res.status(500).end();
	}));
});


app.put('/api/drinks', (req, res) => {
	changeDrinkData(req.body).then((data) => {
		console.log("drink has been changed!");
		res.status(204).end();
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	});
});

app.delete('/api/drinks', (req, res) => {
	console.log(req.body);
	deleteDrink(req.body).then((data) => {
		console.log("drink has been Deleted1!");
		res.status(204).end();
	}).catch((err) => {
		console.error(err);
		res.status(500).end();
	});
});

//DRINK CREATION TANK!!
// FOR CUSTOM DRINKS!!
// ============================================================================

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
