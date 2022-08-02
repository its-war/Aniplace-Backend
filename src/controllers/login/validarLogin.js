require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const Admin = require('../../models/Admin');

module.exports.eAutorizado = (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.send({auth: false});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.send({auth: false});
        else{
            let user = Usuario.findOne({chave: decoded.chave}).exec();
            user.then((doc) => {
                if(doc){
                    if(doc.ativo === 1 || doc.ativo === 2){
                        doc.acessos++;
                        doc.save();
                        let user = {
                            _id: doc._id,
                            fistname: doc.nome.split(' ')[0],
                            foto: doc.foto,
                            ativo: doc.ativo
                        }
                        let update = {
                            enabled: false,
                            text: []
                        }
                        if(doc.version < req.update[0].version){
                            let text = req.update[0].text.split("--*--");
                            update = {
                                enabled: true,
                                text: text
                            }
                        }
                        res.json({auth: true, user: user, update: update});
                    }else{
                        return res.send({auth: false});
                    }
                }else{
                    return res.send({auth: false});
                }
            });
        }
    });
};