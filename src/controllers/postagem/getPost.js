const Postagem = require('../../models/Postagem');
const Usuario = require('../../models/Usuario');
const Comentario = require('../../models/Comentario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({post: {}});
    }

    await Postagem.findById(id).populate({
        populate: [
            {
                path: 'autor',
                select: '_id nome foto',
                model: Usuario
            },
            {
                path: 'curtidas',
                model: Usuario
            },
            {
                path: 'comentarios',
                model: Comentario
            }
        ]
    }).then((post) => {
        if(post){
            return res.send({post: post});
        }else{
            return res.send({post: {}});
        }
    });
}