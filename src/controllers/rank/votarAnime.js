const Ranking = require('../../models/Ranking');
const Anime = require('../../models/Anime');

module.exports = (req, res) => {
    let user = req.body.idUser;
    let nota = req.body.nota;
    let anime = req.body.idAnime;

    new Ranking({nota: nota, user: user}).save().then((novoRank) => {
        let a = Anime.findById(anime).exec();
        a.then((doc) => {
            doc.markModified('notas');
            doc.notas.push(novoRank);
            res.send({cadastro: true});
        });
    });
}