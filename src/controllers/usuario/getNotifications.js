const Notification = require('../../models/Notification');
const Usuario = require('../../models/Usuario');
const Postagem = require('../../models/Postagem');
const Anime = require('../../models/Anime');
const Comentario = require('../../models/Comentario');
module.exports = async (req, res) => {
    await Notification.find({
        para: req.userData._id
    }).sort({_id: "desc"}).limit(25).populate([
        {
            path: 'de',
            select: 'nome foto',
            model: Usuario
        },
        {
            path: 'dataPost',
            model: Postagem
        },
        {
            path: 'dataAnime',
            model: Anime
        },
        {
            path: 'dataComment',
            model: Comentario
        }
    ]).then(async (notifications) => {
        if(notifications.length > 0){
            console.log(notifications);
            return res.send({notifications: notifications});
        }
    });
}