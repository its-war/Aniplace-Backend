const Anime = require('../../../models/Anime');
const Genero = require('../../../models/Genero');

module.exports = (req, res) => {
    let anime = req.anime;
    let generos = req.body.generos;
    if(generos.length >= 1){
        anime.markModified('generos');
        let g;
        for(let i = 0; i < generos.length; i++){
            g = Genero.findById(generos[i]).exec();
            g.then((gen) => {
                anime.generos.push(gen._id);
                if(i === generos.length - 1){
                    anime.save();
                    res.send({cadastro: true});
                }
            });
        }
    }else{
        res.send({cadastro: false});
    }
}