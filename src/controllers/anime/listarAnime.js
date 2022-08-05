const Anime = require('../../models/Anime');
const Fansub = require('../../models/Fansub');
const Temporada = require('../../models/Temporada');
const Episodio = require('../../models/Episodio');
module.exports = (req, res) => {
    if(req.params.id.length !== 24){
        return res.send({anime: {isNotSet: true}});
    }
    Anime.findById(req.params.id).populate({
        path: 'temporada', model: Temporada,
        populate: [
            {path: 'episodios', model: Episodio},
            {path: 'fansubs', model: Fansub}]
    }).populate('generos').then((anime) => {
        if(anime){
            anime.markModified('acessos');
            anime.acessos = anime.acessos + 1;
            anime.save();
            res.send({anime: anime, nota: req.nota});
        }else{
            return res.send({anime: {isNotSet: true}});
        }
    });
}