const Genero = require('../../../models/Genero');

module.exports = (req, res) => {
    Genero.find().then((doc) => {
        res.send({generos: doc});
    }).catch((err) => {
        res.send({generos: [], msg: "Erro no servidor, tente novamente mais tarde."});
    });
}