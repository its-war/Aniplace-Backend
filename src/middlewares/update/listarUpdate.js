const Update = require('../../models/Update');
module.exports = (req, res, next) => {
    Update.find().sort({version: "desc"}).limit(1).then((doc) => {
        if(doc){
            req.update = doc;
        }else{
            req.update = [{
                _id: '',
                version: 1,
                text: ""
            }]
        }
        next();
    });
}