const Genero = require('../../../models/Genero');

module.exports = async (req, res, next) => {
    let anime = req.anime;
    let generos = req.body.generos;
    if(generos.length >= 1){
        anime.markModified('generos');
        let g;
        for(let i = 0; i < generos.length; i++){
            g = Genero.findById(generos[i]).exec();
            await g.then((gen) => {
                anime.generos.push(gen._id);
                if(i === generos.length - 1){
                    anime.save();
                    req.anime = anime;
                    next();
                }
            });
        }
    }else{
        next();
    }
}