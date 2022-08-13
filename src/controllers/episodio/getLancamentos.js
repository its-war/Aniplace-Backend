const Episodio = require('../../models/Episodio');
const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    await Episodio.find()
        .sort({_id: "desc"})
        .limit(10)
        .select('numero anime thumb')
        .populate('anime', 'nome _id', Anime).then((episodios) => {
        res.send(episodios);
    });
}