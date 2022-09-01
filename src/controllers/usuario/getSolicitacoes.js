const Solicitacao = require('../../models/Solicitacao');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    await Solicitacao.find({para: req.userData._id, status: 0})
        .populate('de', 'nome foto', Usuario)
        .then((solicitacoes) => {
            return res.send({solicitacoes: solicitacoes});
    });
}