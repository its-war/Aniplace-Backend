const Temporada = require('../../../models/Temporada');
module.exports = async (req, res) => {
    let periodoInicial = req.body.temporada.periodoInicial;
    let periodoFinal = req.body.temporada.periodoFinal;
    let ano = req.body.temporada.ano;
    let anoFinal = req.body.temporada.anoFinal;
    let titulo = req.body.temporada.titulo;
    let estudio = req.body.temporada.estudio;
    let numero = req.body.temporada.numero;
    let fansubs = req.body.temporada.fansubs;

    await Temporada.create({
        periodoInicial: periodoInicial,
        periodoFinal: periodoFinal,
        ano: ano,
        anoFinal: anoFinal,
        titulo: titulo,
        estudio: estudio,
        numero: numero,
        fansubs: fansubs
    }).then((temporada) => {
        if(temporada){
            let a = req.anime;
            a.temporada.push(temporada._id);
            a.save();
            return res.send({cadastro: true});
        }else{
            return res.send({cadastro: false});
        }
    })
}