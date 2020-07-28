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
    "strIngredient": { type: Object },
    "strMeasure": { type: Object },
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
            dateModified
        });
        return Drink.find({ idDrink: idDrink }, (err, k) => {
            console.log('k', k);
            if (!k.length) {
                return Dr.save().then(() => { console.log('hit me!!') });
            } else {
                console.log('failed');
            }
    })
};

const getDrinks = () => {
    return Drink.find({}).exec();
};

const getCD = () => {
    return Drink.find({}).exec();
};
const changeDrinkData = () => {
    
};

const deleteDrink = () => {
    
};
module.exports = {
    getDrinks,
    saveDrink
}