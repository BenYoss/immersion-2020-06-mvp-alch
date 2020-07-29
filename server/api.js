const axios = require('axios');
require('dotenv').config();
const e = require('express');
const { xkey, host, PORT } = process.env;
const getAlcohol = (drinkname) => {
	return axios({
		"method": "GET",
		"url": `https://www.thecocktaildb.com/api/json/v1/1/search.php`,
		"headers": {
			"content-type": "application/octet-stream",
			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
			"x-rapidapi-key": xkey,
			"useQueryString": true
		}, "params": {
			"s": `${drinkname}`
		}
	})
		.then((response) => {
			console.log(response);
			if (response.data.drinks !== null && response) {
				return response.data.drinks[0];
			} else {
				console.log("help")
				return axios.get("/create/drinks", { proxy: { host: host, port: PORT } })
					.then(({ data }) => {
						let h = [];
						data.forEach((elt) => {
							if (elt.strDrink) {
								if (elt.strDrink === drinkname || elt.strDrink.includes(drinkname)) {
									console.log(elt);
									h.push(elt);
								}
							}
						})
						return h[0];
						// if(res.data){
						// 	return res.data;
						// } else {
						// 	console.log('failed to retrieve data: nothing seems to be in our system');
						// }
					})
					.catch(err => console.error(err));
			}
		})
		.catch((error) => {
			console.log(error)
		})
};

module.exports = {
	getAlcohol,
}
