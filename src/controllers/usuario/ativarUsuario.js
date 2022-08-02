module.exports = (req, res) => {
    const Usuario = require('../../models/Usuario');
    const jwt = require('jsonwebtoken');
    jwt.verify(req.params.chave, process.env.SECRET, (err, decoded) => {
        if(err){
            res.redirect('/notFound');
        }else{
            let user = Usuario.findOne({chave: decoded.chave}).exec();
            user.then((doc) => {
                if(doc){
                    doc.ativo = 1;
                    doc.save();
                    res.redirect('/login/ativado');
                }else{
                    res.redirect('/notFound');
                }
            });
        }
    });
};