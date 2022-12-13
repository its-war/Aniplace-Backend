const Solicitacao = require('../../models/Solicitacao');
const Usuario = require('../../models/Usuario');
const Notification = require('../../models/Notification');
const datahora = require('../../plugins/datahora');
module.exports = async (req, res) => {
    let id = req.params.de;
    if(id.length !== 24){
        return res.send({amizade: false});
    }

    if(id === req.userData._id.toString()){
        return res.send({amizade: false});
    }

    for(let i = 0; i < req.userData.amigos.length; i++){
        if(req.userData.amigos[i]._id.toString() === id){
            return res.send({amizade: true});
        }
    }

    await Usuario.findById(req.userData._id).select('amigos').then((u) => {//user logado
        if(u){
            u.markModified('amigos');
            u.amigos.push(id);
            u.save();
        }else{
            return res.send({amizade: false});
        }
    });

    let user = null;
    await Usuario.findById(id).select('amigos idSocket').then((u) => {//user que solicitou
        if(u){
            u.markModified('amigos');
            u.amigos.push(req.userData._id);
            u.save();
            user = u;
        }else{
            return res.send({amizade: false});
        }
    });

    await Solicitacao.updateOne({de: id, para: req.userData._id}, {status: 1}).exec();

    await (await Notification.create({
        registro: Date.now(),
        de: req.userData._id,
        para: id,
        action: 1
    })).populate({
            path: 'de',
            select: 'nome foto',
            model: Usuario
        }
    ).then((notification) => {
        if(notification){
            req.io.to(user.idSocket).emit('newNotification', {notification: notification});
            res.send({amizade: true});
        }
    });
}