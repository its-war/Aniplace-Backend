const Anime = require('../../../models/Anime');
const Fansub = require('../../../models/Fansub');
const Temporada = require('../../../models/Temporada');
module.exports = async (req, res) => {
    let idAnime = req.body.id;
    if(idAnime.length !== 24){
        return res.send({erro: true});
    }

    let fansubs = req.body.fansubs;
    if(!Array.isArray(fansubs))
        return res.send({erro: true});
    if(fansubs.length < 1)
        return res.send({erro: true});


    let numero = req.body.numero;

    for(let i = 0; i < fansubs.length; i++){
        await Fansub.findById(fansubs[i]).then((f) => {
            if(f){
                fansubs[i] = f;
            }
        });
    }

    await Anime.findById(idAnime).populate({
        path: 'temporada',
        model: Temporada,
        populate: {
            path: 'fansubs',
            model: Fansub
        }
    }).then((anime) => {
        for(let i = 0; i < anime.temporada.length; i++){
            if(anime.temporada[i].numero === numero){
                Temporada.findById(anime.temporada[i]._id).then((temporada) => {
                    temporada.markModified('fansubs');
                    for(let j = 0; j < fansubs.length; j++){
                        temporada.fansubs.push(fansubs[j]._id);
                    }
                    temporada.save();
                    res.send({erro: false});
                });
            }
        }
    });
}