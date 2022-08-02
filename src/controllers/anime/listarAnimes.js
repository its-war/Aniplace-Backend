const Anime = require('../../models/Anime');
module.exports = (req, res) => {
    Anime.find({}, 'nome foto').then((docs) => {
        if(docs){
            res.send({animes: docs});
        }else{
            res.send({animes: []});
        }
    });
}