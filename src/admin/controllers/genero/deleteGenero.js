const Genero = require('../../../models/Genero');

module.exports = (req, res) => {
    let id = req.body.id;

    Genero.findByIdAndRemove(id).exec();
    res.sendStatus(200);
}