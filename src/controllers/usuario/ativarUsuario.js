const conn = require("../../config/database");
module.exports = (req, res) => {
    const conn = require('../../config/database');
    const jwt = require('jsonwebtoken');
    jwt.verify(req.params.chave, process.env.SECRET, (err, decoded) => {
        if(err){
            res.redirect('/notfound');
        }else{
            let sql = "update usuario set ativo = 1 where email=? and ativo=0 and chave=?;";
            conn.query(sql, [decoded.email, decoded.chave], (err, result, field) => {
                if(result.affectedRows === 1){
                    res.redirect('/login/ativado');
                }else{
                    res.redirect('/notfound');
                }
            });
        }
    });
};