require('dotenv-safe').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL).then(() => {
    //console.log("Conectou");
    //mongodb://localhost/aniplace
    //mongodb+srv://itswar:27652765@aniplace.a7rjwww.mongodb.net/?retryWrites=true&w=majority
    //mongoose.connection.db.dropDatabase();
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;
