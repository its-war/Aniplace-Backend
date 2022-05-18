require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
    const tokenReq = req.headers['x-access-token'];
    const conn = require('../../config/database');

    jwt.verify(tokenReq, process.env.SECRET, (err, decoded) => {
        if(!err){
            return res.sendStatus(401);
        }
    });

    let usuario = req.body.nomeusuario;
    let senha  = req.body.senha;
    let sql = "select chave, senha from usuario where nomeusuario=? and ativo=1;";

    conn.query(sql, [usuario], (err, result, fields) => {
        if(result.length > 0){
            if(bcrypt.compareSync(senha, result[0].senha)){
                let chave = result[0].chave + Date.now().toString() + Math.random().toString();
                const token = jwt.sign({chave: chave}, process.env.SECRET, {
                    expiresIn: '1h'
                });
                req.chave = chave;
                req.headers['x-access-token'] = token;
                return res.json({autorizado: true, token: token});
            }else{
                return res.json({autorizado: false});
            }
        }else{
            return res.json({autorizado: false});
        }
    });
};