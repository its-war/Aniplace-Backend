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

    await Usuario.findById(id).select('amigos').then((u) => {//user que solicitou
        if(u){
            u.markModified('amigos');
            u.amigos.push(req.userData._id);
            u.save();
        }else{
            return res.send({amizade: false});
        }
    });

    let idNotification = null;

    await Notification.create({
        texto: '-$$$- aceitou sua solicitação de amizade.',
        registro: datahora.getData() + '-' + datahora.getHora(),
        para: id,
        action: 1,
        metadado: req.userData._id
    }).then((notification) => {
        if(notification){
            idNotification = notification._id;
        }
    });

    res.redirect('/notification/aceitarSolicitacao/' + id + '/' + idNotification);
}