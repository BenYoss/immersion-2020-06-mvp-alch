const mongoose = require('mongoose');
const host = process.env.host;
mongoose.connect(`mongodb://localhost/fetcher`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("successfully connected to Database!");
    })
    .catch((err) => {
        console.error(err);
    });

const drinkSchema = new mongoose.Schema({
    "idDrink": { type: String },
    "strDrink": { type: String },
    "strVideo": { type: String },
    "strCatagory": { type: String },
    "strAlcoholic": { type: String },
    "strGlass": { type: String },
    "strInstructions": { type: String },
    "strDrinkThumb": { type: String },
    "strIngredient": { type: Array },
    "strMeasure": { type: Array },
    "username": { type: String },
    "dateModified": { type: Date },
});

const Drink = mongoose.model('Drink', drinkSchema);
const CustomDrink = mongoose.model('CustomDrink', drinkSchema);

const saveCD = ({
    idDrink,
    strDrink,
    strVideo,
    strCatagory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strDrinkThumb,
    strIngredient,
    strMeasure,
    dateModified }) => {
    const CDr = new CustomDrink({
        idDrink,
        strDrink,
        strVideo,
        strCatagory,
        strAlcoholic,
        strGlass,
        strInstructions,
        strDrinkThumb,
        strIngredient,
        strMeasure,
        dateModified
    });
    return CustomDrink.find({ idDrink: idDrink }, (err, k) => {
        console.log('k', k);
        if (!k.length) {
            return CDr.save().then(() => { console.log("Custom drink saved to DB") });
        } else {
            console.log('failed');
        }
    })
};


const saveDrink = ({
    idDrink,
    strDrink,
    strVideo,
    strCatagory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strDrinkThumb,
    strIngredient,
    strMeasure,
    username,
    dateModified }) => {
        const Dr = new Drink({
            idDrink,
            strDrink,
            strVideo,
            strCatagory,
            strAlcoholic,
            strGlass,
            strInstructions,
            strDrinkThumb,
            strIngredient,
            strMeasure,
            username,
            dateModified
        });
        return Drink.find({ idDrink: idDrink }, (err, k) => {
            console.log('k', k);
            if (!k.length || k.username !== username) {
                return Dr.save().then(() => { console.log('hit me!!', username) });
            } else {
                console.log('failed');
            }
    })
};

const getDrinks = (username) => {
    console.log('username for drinks', username);
    return Drink.find({ username: username }).exec();   
};
const getDrink = (options) => {
    return Drink.findOne(options).exec();
};

const getCD = () => {
    return CustomDrink.find({}).exec();
};
//|DeleteDrink method updates drinks passed into it through specific options
//  \Should delete any drinks from the drink list.
const changeDrinkData = (options) => {
    console.log(options.idDrink);
    return Drink.updateOne({idDrink: options.idDrink}, options, (err, success) => {
        console.log(`Drink, ${options.strDrink} has been updated with ${options}!`);
    });
};
//|DeleteDrink method deletes drinks passed into it based on name
//  \Should delete any drinks from the drink list.
const deleteDrink = ({ idDrink }) => {
    return Drink.deleteOne({ idDrink: idDrink }, (err, success) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(`Drink, ${idDrink} has been deleted!`);
    })
};

module.exports = {
    getDrinks,
    saveDrink,
    getCD,
    saveCD,
    changeDrinkData,
    deleteDrink,
    getDrink
}