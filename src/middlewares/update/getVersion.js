const Update = require('../../models/Update');
module.exports = (req, res, next) => {
    Update.find().sort({version: "desc"}).limit(1).then((doc) => {
        req.version = doc ? doc[0].version : 0;
        next();
    });
}