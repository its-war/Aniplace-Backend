require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const Usuario = require("../../models/Usuario");

module.exports = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.send({auth: false});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.send({auth: false});
        else{
            //let chave = decoded.chave;
            //let novoToken = jwt.sign({chave: chave}, process.env.SECRET, {
            //expiresIn: '1h'
            //});
            let user = Usuario.findOne({chave: decoded.chave}).populate({
                path: 'amigos',
                select: 'chave',
                model: Usuario
            }).exec();
            user.then((doc) => {
                if(doc){
                    req.userData = doc;
                    next();
                }else{
                    return res.send({auth: false});
                }
            });
        }
    });
}