const Postagem = require('../../models/Postagem');
const Comentario = require('../../models/Comentario');
const fs = require('fs');
module.exports = async (req, res) => {
    let id = req.body.id;
    if(id.length !== 24){
        return res.send({delete: false});
    }

    await Postagem.findById(id).select('imagem autor comentarios').populate({
        path: 'comentarios',
        model: Comentario
    }).then( async (post) => {
        if(post){
            if(post.autor.toString() !== req.userData._id.toString()){
                return res.send({delete: false});
            }

            if(post.comentarios.length > 0){
                let comments = [];
                for(let i = 0; i < post.comentarios.length; i++){
                    comments.push(post.comentarios[i]._id);
                    if(post.comentarios[i].respostas.length > 0){
                        await Comentario.deleteMany({_id: {$in : post.comentarios[i].respostas}}).then();
                    }
                }
                await Comentario.deleteMany({_id: {$in: comments}}).then(() => {
                    if(post.imagem !== ''){
                        fs.unlinkSync('./public/img/posts/' + post.imagem);
                    }
                    post.delete();
                    return res.send({delete: true});
                });
            }else{
                post.delete();
                return res.send({delete: true});
            }
        }else{
            return res.send({delete: false});
        }
    });
}