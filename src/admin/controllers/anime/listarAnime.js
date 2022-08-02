const Anime = require('../../../models/Anime');

module.exports = (req, res) => {
    let id = req.body.id;

    if(id.length !== 24){
        res.send({anime: []});
    }else{
        try{
            let anime = Anime.findById(id).exec();
            anime.then((doc) => {
                if(doc){
                    res.send({anime: doc});
                }else{
                    res.send({anime: []});
                }
            });
        }catch (err){
            res.send({anime: []});
        }
    }
}