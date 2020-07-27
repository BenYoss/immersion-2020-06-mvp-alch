require('dotenv').config();
const axios = require('axios');
const { xkey } = process.env;
const getAlcohol = ({ drinkname }) => {
	return axios({
		"method":"GET",
		"url":`https://www.thecocktaildb.com/api/json/v1/1/search.php`,
		"headers":{
		"content-type":"application/octet-stream",
		"x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key":xkey,
		"useQueryString":true
		},"params":{
		"s":`${drinkname}`
		}
		})
		.then((response)=>{
		   return response.data.drinks[0];
		})
		.catch((error)=>{
		  console.log(error)
		})
};

module.exports = {
	getAlcohol,
}
