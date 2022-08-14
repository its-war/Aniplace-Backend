const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    if(req.params.value.length < 3){
        return res.send({results: []});
    }

    await Anime.find({nome: {$regex: '.*' + req.params.value + '.*', $options: 'i'}})
        .limit(20).select('_id nome foto temporada generos')
        .populate([
            {path: 'temporada', select: 'ano -_id', match: {numero: 1}},
            {path: 'generos', select: 'nome -_id'}
        ])
        .then((animes) => {
            if(animes){
                return res.send({results: animes});
            }else{
                return res.send({results: []});
            }
        });
}