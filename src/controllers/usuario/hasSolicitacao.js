const Solicitacao = require('../../models/Solicitacao');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({hasSolicitacao: false});
    }

    await Solicitacao.findOne({
        de: req.userData._id,
        para: id,
        status: 0
    }).select('_id').then((solicitacao) => {
        if(solicitacao){
            return res.send({hasSolicitacao: true});
        }else{
            return res.send({hasSolicitacao: false, option: 1});
        }
    });
}