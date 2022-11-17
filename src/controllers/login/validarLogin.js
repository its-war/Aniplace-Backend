require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');

module.exports.eAutorizado = (req, res) => {
    const token = req.headers['x-access-token'];
    if(!token){
        return res.send({auth: false});
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.send({auth: false});
        else{
            let user = Usuario.findOne({chave: decoded.chave}).populate('amigos', '_id nome foto idSocket', Usuario).exec();
            user.then((doc) => {
                if(doc){
                    if(doc.ativo === 1 || doc.ativo === 2){
                        doc.acessos++;
                        doc.save();

                        let amigos = [];
                        for(let i = 0; i < doc.amigos.length; i++){
                            amigos.push({
                                _id: doc.amigos[i]._id,
                                nome: doc.amigos[i].nome,
                                foto: doc.amigos[i].foto,
                                idSocket: doc.amigos[i].idSocket,
                                online: false
                            });
                            req.io.to(doc.amigos[i].idSocket).emit('vistoOnline', {
                                idAmigo: doc._id
                            });
                        }

                        let user = {
                            _id: doc._id,
                            fistname: doc.nome.split(' ')[0],
                            nome: doc.nome,
                            foto: doc.foto,
                            ativo: doc.ativo,
                            amigos: amigos
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