const Ranking = require('../../models/Ranking');
const Anime = require('../../models/Anime');
const Usuario = require('../../models/Usuario');

module.exports = async (req, res) => {
    let user = req.body.idUser;
    let nota = req.body.nota;
    let anime = req.body.idAnime;

    await Anime.findById(anime).then((a) => {
        if(a){
            anime = a;
        }else{
            return res.send({nota: 0});
        }
    });

    await Usuario.findById(user).then((u) => {
        if(u){
            user = u;
        }else{
            return res.send({nota: 0});
        }
    });

    if(req.nota.length === 0){ // criar novo
        await Ranking.create({
            nota: nota,
            anime: anime._id,
            user: user._id
        }).then((rank) => {
            return res.send({nota: rank.nota});
        });
    }else{
        await Ranking.find({
            user: req.body.idUser,
            anime: req.body.idAnime
        }).then((rank) => {
            rank[0].nota = nota;
            rank[0].save();
            return res.send({nota: rank[0].nota});
        });
    }
}