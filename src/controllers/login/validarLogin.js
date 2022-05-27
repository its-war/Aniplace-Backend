require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

module.exports.eAutorizado = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.send({autorizado: false, msg: "Não autorizado."});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.send({autorizado: false, msg: "Token inválido."});
        else{
            let chave = decoded.chave;
            let novoToken = jwt.sign({chave: chave}, process.env.SECRET, {
                expiresIn: '1h'
            });
            res.json({autorizado: true, token: novoToken});
            next();
        }
    });
};