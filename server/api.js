require('dotenv').config();
const axios = require('axios');
const { xkey } = process.env;
const getAlcohol = ({ drinkname }) => {
	return axios({
		"method":"GET",
		"url":"https://the-cocktail-db.p.rapidapi.com/search.php",
		"headers":{
		"content-type":"application/octet-stream",
		"x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
		"x-rapidapi-key":xkey,
		"useQueryString":true
		},"params":{
		"i":`${drinkname}`
		}
		})
		.then((response)=>{
		  return response.data.ingredients[0];
		})
		.catch((error)=>{
		  console.log(error)
		})
};

module.exports = {
	getAlcohol,
}
