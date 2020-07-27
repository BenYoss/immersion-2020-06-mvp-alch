const mongoose = require('mongoose');
const host = process.env.host;
mongoose.createConnection(`mongodb://${host}/monmoose`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("successfully connected to Database!");
})
.catch((err) => {
console.error(err);
});


module.exports = {

}