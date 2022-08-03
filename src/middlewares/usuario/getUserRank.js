const Ranking = require('../../models/Ranking');
module.exports = async (req, res, next) => {
    if(req.params.iduser.length !== 24 || (req.params.id.length !== 24)){
        return res.send({anime: {isSet: false}});
    }

    await Ranking.find({
        user: req.params.iduser,
        anime: req.params.id
    }).then((rank) => {
        if(rank){
            req.nota = rank;
        }
        next();
    });
}