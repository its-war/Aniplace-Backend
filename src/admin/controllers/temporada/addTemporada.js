const Anime = require('../../../models/Anime');
const Temporada = require('../../../models/Temporada');
const Fansub = require('../../../models/Fansub');
module.exports = async (req, res) => {
    if(req.body.id.length !== 24){
        return res.send({erro: true});
    }

    let periodoInicial = req.body.periodoInicial;
    let periodoFinal = req.body.periodoFinal;
    let ano = req.body.ano;
    let anoFinal = req.body.anoFinal;
    let titulo = req.body.titulo;
    let estudio = req.body.estudio;
    let numero = req.body.numero;
    let fansub = req.body.fansub;

    if(fansub.length > 0){
        await Fansub.findById(fansub[0]).then((inFansub) => {
            if(inFansub){
                Temporada.create({
                    periodoInicial: periodoInicial,
                    periodoFinal: periodoFinal,
                    ano: ano,
                    anoFinal: anoFinal,
                    titulo: titulo,
                    estudio: estudio,
                    numero: numero,
                    fansubs: [inFansub._id]
                }).then((novaTemporada) => {
                    Anime.findById(req.body.id).then((anime) => {
                        anime.temporada.push(novaTemporada._id);
                        anime.save();
                        return res.send({erro: false});
                    });
                });
            }else{
                Temporada.create({
                    periodoInicial: periodoInicial,
                    periodoFinal: periodoFinal,
                    ano: ano,
                    anoFinal: anoFinal,
                    titulo: titulo,
                    estudio: estudio,
                    numero: numero,
                    fansubs: []
                }).then((novaTemporada) => {
                    Anime.findById(req.body.id).then((anime) => {
                        anime.temporada.push(novaTemporada._id);
                        anime.save();
                        return res.send({erro: false});
                    });
                });
            }
        });
    }else{
        Temporada.create({
            periodoInicial: periodoInicial,
            periodoFinal: periodoFinal,
            ano: ano,
            anoFinal: anoFinal,
            titulo: titulo,
            estudio: estudio,
            numero: numero,
            fansubs: []
        }).then((novaTemporada) => {
            Anime.findById(req.body.id).then((anime) => {
                anime.temporada.push(novaTemporada);
                anime.save();
                return res.send({erro: false});
            });
        });
    }
}