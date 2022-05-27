module.exports = (req, res) => {
    const conn = require('../../config/database');
    let sql = "update usuario set ativo = 1 where chave=?;";
    let chave = req.body.chave;
    conn.query(sql, [chave], (err, result, field) => {
        if(result.affectedRows === 1){
            res.sendStatus(200);
        }else{
            res.sendStatus(401);
        }
    });
};