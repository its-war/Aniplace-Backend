const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "Warney",
    password: "27652765",
    port: 3306,
    database: "otakuland"
});

module.exports = connection;