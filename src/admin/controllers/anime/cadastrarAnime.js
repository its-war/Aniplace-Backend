const Anime = require('../../../models/Anime');

module.exports = async (req, res, next) => {
    let nome = req.body.nome;
    let nomeAlternativo = req.body.nomeAlternativo;
    let sinopse = req.body.sinopse;
    let foto = req.body.foto;
    let cover = req.body.cover;
    let generos = req.body.generos;
    let ano = req.body.temporada.ano;

    await new Anime({
        nome: nome,
        nomeAlternativo: nomeAlternativo,
        sinopse: sinopse,
        foto: foto,
        cover: cover,
        ano: ano,
        generos: generos
    }).save().then((doc) => {
        req.anime = doc;
        next();
    });
}