require('dotenv').config();
const axios = require('axios');
const e = require('express');
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
			// console.log(response);
		if(response.data.drinks !== null){
			return response.data.drinks[0];
		} else {
			return axios.get("/create/drinks")
			.then((res) => {
				if(res.data){
					return res.data;
				} else {
					console.log('failed to retrieve data: nothing seems to be in our system');
				}
			})
			.catch(err => console.error(err));
		}
		})
		.catch((error)=>{
		  console.log(error)
		})
};

module.exports = {
	getAlcohol,
}
