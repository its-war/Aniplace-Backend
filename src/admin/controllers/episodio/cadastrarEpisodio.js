const Temporada = require('../../../models/Temporada');
const Episodio = require('../../../models/Episodio');
module.exports = async (req, res) => {
    if(req.body.id.length !== 24){
        res.send({episodio: {}});
    }

    let numero;
    if(typeof req.body.numero === "undefined"){
        numero = 0;
    }else{
        numero = req.body.numero;
    }

    await Temporada.findById(req.body.id).select('episodios').populate('episodios', '_id').then(async(temporada) => {
        if(numero === 0){
            numero = temporada.episodios.length + 1;
        }

        await Episodio.create({
            numero: numero,
            thumb: req.body.thumb,
            online: req.body.online
        }).then((episodio) => {
            temporada.episodios.push(episodio._id);
            temporada.save();
            return res.send({episodio: episodio});
        });
    });
}