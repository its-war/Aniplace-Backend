const Temporada = require('../../models/Temporada');
module.exports = async (req, res) => {
    await Temporada.find({
        numero: {
            $eq: 1
        }
    }).select('ano -_id').then((temporadas) => {
        let anos = [];
        for(let i = 0; i < temporadas.length; i++){
            anos.push(temporadas[i].ano);
        }
        res.send({menorAno: Math.min(...anos)});
    });
}