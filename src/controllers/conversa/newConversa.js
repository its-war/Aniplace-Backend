const Conversa = require('../../models/Conversa');
const Mensagem = require('../../models/Mensagem');
module.exports = async (req, res) => {
    let id = req.body.id;
    if(id.length !== 24){
        return res.send({conversa: null});
    }

    await Conversa.find({
        $or: [
            {participantes: [req.userData._id, id]},
            {participantes: [id, req.userData._id]}
        ]
    }).populate({
        path: 'mensagens',
        model: Mensagem
    }).then((conversas) => {
        if(conversas.length > 0){
            return res.send({conversa: conversas[0]});
        }else{
            Conversa.create({
                participantes: [
                    id,
                    req.userData._id
                ]
            }).then((conversa) => {
                if(conversa){
                    return res.send({conversa: conversa});
                }else{
                    return res.send({conversa: null});
                }
            });
        }
    });
}