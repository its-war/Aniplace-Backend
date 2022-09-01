const Solicitacao = require('../../models/Solicitacao');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    if(req.params.id.length !== 24){
        return res.send({solicitacao: []});
    }

    await Solicitacao.findById(req.params.id)
        .populate('de', 'nome foto', Usuario)
        .then((solicitacao) => {
        if(solicitacao){
            return res.send({solicitacao: solicitacao});
        }
    });
}