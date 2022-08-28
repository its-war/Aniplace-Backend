const Anime = require('../../models/Anime');
const Ranking = require('../../models/Ranking');
module.exports = async (req, res) => {
    await Anime.find().select('nome nota').sort({nota: "desc"}).limit(10).then((animes) => {
        res.send({animes: animes});
    });
}