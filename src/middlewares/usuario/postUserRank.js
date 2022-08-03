const Ranking = require('../../models/Ranking');
module.exports = async (req, res, next) => {
    if(req.body.idUser.length !== 24 || (req.body.idAnime.length !== 24)){
        return res.send({nota: 0});
    }

    await Ranking.find({
        user: req.body.idUser,
        anime: req.body.idAnime
    }).then((rank) => {
        if(rank){
            req.nota = rank;
        }
        next();
    });
}