const Conversa = require('../../models/Conversa');
const Mensagem = require('../../models/Mensagem');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    await Conversa.find({
        participantes: {$in: [req.userData._id]}
    }).populate([
        {
            path: 'mensagens',
            model: Mensagem,
            populate: {
                path: 'autor',
                model: Usuario,
                select: 'nome foto'
            },
            options: {
                limit: 10,
                sort: {_id: 'desc'},
                skip: 0
            }
        },
        {
            path: 'participantes',
            model: Usuario,
            select: 'nome foto'
        }
    ]).sort({_id: "desc"}).then((conversas) => {
        for(let i = 0; i < conversas.length; i++){
            let mensagens = [];
            for(let j = 0; j < conversas[i].mensagens.length; j++){
                mensagens.unshift(conversas[i].mensagens[j]);
            }
            conversas[i].mensagens = mensagens;
        }

        let c = [];
        for(let i = 0; i < conversas.length; i++){
            c.push({
                _id: conversas[i]._id,
                mensagens: conversas[i].mensagens,
                participantes: conversas[i].participantes,
                ativo: false,
                position: 0
            });
        }

        return res.send({conversas: c});
    }).catch(() => {
        return res.send({conversas: []});
    });
}