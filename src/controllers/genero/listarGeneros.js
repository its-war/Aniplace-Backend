const Genero = require('../../models/Genero');
module.exports = async (req, res) => {
    await Genero.find({}, 'nome').sort({nome: "asc"}).then((generoList) => {
        return res.send({generos: generoList});
    });
}