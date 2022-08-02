const Destaque = require('../../../models/Destaque');
const Anime = require('../../../models/Anime');

module.exports = (req, res) => {
    let idAnime = req.body.id;
    let isFoto = req.body.isFoto;

    let anime = Anime.findById(idAnime).exec();
    anime.then((doc) => {
        if(doc){
            new Destaque({
                anime: doc._id,
                foto: isFoto ? req.body.foto : doc.foto,
                animeFoto: !isFoto
            }).save().then(() => {
                res.send({cadastro: true});
            });
        }else{
            res.send({cadastro: false});
        }
    });
}