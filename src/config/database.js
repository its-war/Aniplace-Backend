require('dotenv-safe').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL).then(() => {
    //console.log("Conectou");
    //mongodb://localhost/aniplace
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;
