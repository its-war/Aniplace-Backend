const Progresso = require('../../models/Progresso');
module.exports = async (req, res) => {
    let idUser = req.body.idUser;
    let idAnime = req.body.idAnime;
    let temporada = req.body.temporada;
    let episodio = req.body.episodio;
    let tempo = req.body.tempo;

    if(idUser.length !== 24 || idAnime.length !== 24){
        return res.send({progresso: false});
    }

    if(isNaN(temporada) || isNaN(episodio) || isNaN(tempo)){
        return res.send({progresso: false});
    }

    await Progresso.findOne({
        user: idUser,
        anime: idAnime
    }).then(async (progresso) => {
        if(progresso){
            progresso.temporada = temporada;
            progresso.episodio = episodio;
            progresso.tempo = tempo;
            await progresso.save();
            return res.send({progresso: true});
        }else{
            await Progresso.create({
                tempo: tempo,
                episodio: episodio,
                temporada: temporada,
                user: idUser,
                anime: idAnime
            }).then((progresso) => {
                if(progresso){
                    return res.send({progresso: true});
                }else{
                    return res.send({progresso: false});
                }
            })
        }
    });
}