const Ranking = require('../../models/Ranking');
module.exports = async (req, res, next) => {
    if(req.params.iduser.length !== 24 || (req.params.id.length !== 24)){
        return res.send({anime: {isNotSet: true}});
    }

    await Ranking.find({
        user: req.params.iduser,
        anime: req.params.id
    }).then((rank) => {
        if(rank){
            req.nota = rank;
        }
        req.userId = req.params.iduser;
        next();
    });
}