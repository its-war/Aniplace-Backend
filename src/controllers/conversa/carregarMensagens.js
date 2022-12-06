const Conversa = require('../../models/Conversa');
const Mensagem = require('../../models/Mensagem');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    let id = req.params.id;
    let pagina = parseInt(req.params.pagina);
    let limite = parseInt(req.params.limite);

    if(isNaN(pagina) || isNaN(limite) || id.length !== 24){
        return res.send({mensagens: []});
    }

    await Conversa.findById(id).populate([
        {
            path: 'mensagens',
            model: Mensagem,
            populate: {
                path: 'autor',
                model: Usuario,
                select: 'nome foto'
            },
            options: {
                limit: limite,
                sort: {_id: 'desc'},
                skip: (pagina - 1) * limite
            }
        },
        {
            path: 'participantes',
            model: Usuario,
            select: 'nome foto'
        }
    ]).then((conversa) => {
        return res.send({mensagens: conversa.mensagens});
    }).catch(() => {
        return res.send({mensagens: []});
    });
}