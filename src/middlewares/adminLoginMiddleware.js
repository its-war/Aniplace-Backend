require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.redirect("/notFound");
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.redirect("/notFound");
        else{
            let user = Admin.findOne({chave: decoded.chave}).exec();
            user.then((doc) => {
                if(doc){
                    next();
                }else{
                    return res.redirect("/notFound");
                }
            });
        }
    });
}