const Anime = require('../../../models/Anime');

module.exports = (req, res, next) => {
    let nome = req.body.nome;
    let sinopse = req.body.sinopse;
    let foto = req.body.foto;

    new Anime({
        nome: nome,
        sinopse: sinopse,
        foto: foto
    }).save().then((doc) => {
        req.anime = doc;
        next();
    });
}