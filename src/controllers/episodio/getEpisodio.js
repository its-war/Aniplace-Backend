const Anime = require('../../models/Anime');
const Episodio = require('../../models/Episodio');
const Temporada = require('../../models/Temporada');
module.exports = async (req, res) => {
    await Anime.findById(req.params.idAnime).select('nome acessos temporada').populate({
        path: 'temporada', model: Temporada, select: 'numero episodios', options: {sort: {numero: "asc"}},
        populate: [
            {
                path: 'episodios',
                model: Episodio,
                select: 'numero thumb aberturaInicio aberturaFim encerramentoInicio encerramentoFim tempo online'
            }
        ]
    }).then((anime) => {
        anime.markModified('acessos');
        anime.acessos = anime.acessos + 1;
        anime.save();
        let src, thumb, dados;
        for (let i = 0; i < anime.temporada.length; i++){
            if(anime.temporada[i].numero === parseInt(req.params.temporada)){
                for(let j = 0; j < anime.temporada[i].episodios.length; j++){
                    if(anime.temporada[i].episodios[j].numero === parseInt(req.params.numero)){
                        src = anime.temporada[i].episodios[j].online;
                        thumb = anime.temporada[i].episodios[j].thumb;
                        dados = {
                            abertura: {
                                inicio: anime.temporada[i].episodios[j].aberturaInicio,
                                fim:anime.temporada[i].episodios[j].aberturaFim
                            },
                            encerramento: {
                                inicio: anime.temporada[i].episodios[j].encerramentoInicio,
                                fim: anime.temporada[i].episodios[j].encerramentoFim
                            },
                            tempo: anime.temporada[i].episodios[j].tempo,
                            nTemporadas: anime.temporada.length,
                            nEpisodios: anime.temporada[i].episodios.length
                        }
                        break;
                    }
                }
                break;
            }
        }
        res.send({anime: anime, src: src, thumb: thumb, dados: dados});
    });
}