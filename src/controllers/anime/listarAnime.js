const Anime = require('../../models/Anime');
const Fansub = require('../../models/Fansub');
const Temporada = require('../../models/Temporada');
const Episodio = require('../../models/Episodio');
const Progresso = require('../../models/Progresso');
module.exports = async (req, res) => {
    if(req.params.id.length !== 24){
        return res.send({anime: {isNotSet: true}});
    }
    await Anime.findById(req.params.id).populate({
        path: 'temporada', model: Temporada,
        populate: [
            {path: 'episodios', model: Episodio},
            {path: 'fansubs', model: Fansub}]
    }).populate('generos').then(async (anime) => {
        if(anime){
            let progresso;
            await Progresso.findOne({
                user: req.userId,
                anime: req.params.id
            }).then((progressoDoc) => {
                if(progressoDoc){
                    progresso = progressoDoc;
                }else{
                    progresso = {
                        _id: '',
                        tempo: 0,
                        episodio: 1,
                        temporada: 1
                    };
                }
            });
            anime.markModified('acessos');
            anime.acessos = anime.acessos + 1;
            await anime.save();
            res.send({anime: anime, nota: req.nota, progresso: progresso});
        }else{
            return res.send({anime: {isNotSet: true}});
        }
    });
}