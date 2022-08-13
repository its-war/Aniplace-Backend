const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    await Anime.find().select('nome').sort({acessos: "desc"}).limit(10).then((animes) => {
        if(animes){
            return res.send({animes: animes});
        }else{
            return res.send({animes: []});
        }
    });
}