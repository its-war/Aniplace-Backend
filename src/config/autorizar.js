require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
module.exports = {
    verificarToken(req, res, next){
        const token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({auth: false, msg: "Não autorizado."});

        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if(err) return res.status(500).json({auth: false, msg: "Token inválido."});

            req.chave = decoded.chave;
            next();
        });
    }
};