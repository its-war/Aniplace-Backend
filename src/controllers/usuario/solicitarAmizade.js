const Solicitacao = require('../../models/Solicitacao');
const datahora = require('../../plugins/datahora');
module.exports = async (req, res) => {
    let para = req.params.para;
    if(para.length !== 24){
        return res.send({solicitacao: false});
    }

    await Solicitacao.find({
        de: req.userData._id,
        para: para
    }).then((solicitacao) => {
        if(solicitacao.length > 0){
            return res.send({solicitacao: false});
        }else{
            Solicitacao.find({
                de: para,
                para: req.userData._id
            }).then((solicitacao) => {
                if(solicitacao.length > 0){
                    return res.send({solicitacao: false});
                }else{
                    Solicitacao.create({
                        de: req.userData._id,
                        para: para,
                        registro: datahora.getData() + '—' + datahora.getHora(),
                    }).then((solicitacao) => {
                        if(solicitacao){
                            res.redirect('/notification/solicitacao/' + para + '/' + solicitacao._id);
                        }else{
                            return res.send({solicitacao: false});
                        }
                    });
                }
            });
        }
    });
}