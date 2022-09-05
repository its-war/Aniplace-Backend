const Solicitacao = require('../../models/Solicitacao');
const Usuario = require('../../models/Usuario');
const Notification = require('../../models/Notification');
const datahora = require('../../plugins/datahora');
module.exports = async (req, res) => {
    let id = req.params.de;
    if(id.length !== 24){
        return res.send({amizade: false});
    }

    let u1, u2, idNotification;

    await Usuario.findById(req.userData._id).select('amigos').then((user) => {
        if(!user){
            return res.send({amizade: false});
        }
        u1 = user;
    });

    await Usuario.findById(id).select('amigos').then((user) => {
        if(!user){
            return res.send({amizade: false});
        }
        u2 = user;
    });

    await Solicitacao.findOne({
        de: id,
        para: req.userData._id
    }).select('status').then((solicitacao) => {
        if(!solicitacao){
            return res.send({amizade: false});
        }
        solicitacao.status = 1;
        solicitacao.save();
    });

    u1.amigos.push(u2._id);
    u2.amigos.push(u1._id);

    await u1.save();
    await u2.save();

    await Notification.create({
        texto: '-$$$- aceitou sua solicitação de amizade.',
        registro: datahora.getData() + '-' + datahora.getHora(),
        para: id,
        action: 1,
        metadado: req.userData._id
    }).then((notification) => {
        if(notification){
            idNotification = notification._id
        }
    });

    res.redirect('/notification/aceitarSolicitacao/' + id + '/' + idNotification);
}