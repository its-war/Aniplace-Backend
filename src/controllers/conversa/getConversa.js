const Conversa = require('../../models/Conversa');
const Mensagem = require('../../models/Mensagem');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({conversa: null});
    }

    await Conversa.findById(id).populate([
        {
            path: 'mensagens',
            model: Mensagem,
            populate: {
                path: 'autor',
                model: Usuario,
                select: 'nome foto'
            }
        },
        {
            path: 'participantes',
            model: Usuario,
            select: 'nome foto'
        }
    ]).then((conversa) => {
        if(conversa){
            let c = {
                _id: conversa._id,
                mensagens: conversa.mensagens,
                participantes: conversa.participantes,
                ativo: false,
                position: 0
            }
            return res.send({conversa: c});
        }else{
            return res.send({conversa: null});
        }
    });
}