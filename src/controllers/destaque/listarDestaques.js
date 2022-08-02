const Destaque = require('../../models/Destaque');
const Genero = require('../../models/Genero');

module.exports = (req, res) => {
    let destaques = Destaque.find().populate({path: 'anime', populate: 'generos'}).exec();
    destaques.then((doc) => {
        if(doc){
            res.json({destaques: doc});
        }else{
            res.json({destaques: []});
        }
    });
}