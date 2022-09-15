const Comentario = require('../../models/Comentario');
const Postagem = require('../../models/Postagem');
const Anime = require('../../models/Anime');
module.exports = async (req, res) => {
    let id = req.body.id;
    if(id.length !== 24){
        return res.send({comentario: null});
    }

    let tipo = parseInt(req.body.tipo);
    if(tipo < 1 || tipo > 3){
        return res.send({comentario: null});
    }

    let texto = req.body.texto;
    if(texto.length < 1){
        return res.send({comentario: null});
    }

    if(tipo === 1){
        await Comentario.create({
            autor: req.userData._id,
            texto: texto,
            registro: Date.now()
        }).then((c) => {
            if(c){
                Postagem.findById(id).select('comentarios').then((post) => {
                    if(post){
                        post.markModified('comentarios');
                        post.comentarios.push(c._id);
                        post.save();
                        return res.send({comentario: c});
                    }
                });
            }
        });
    }

    if(tipo === 2){
        await Comentario.create({
            autor: req.userData._id,
            texto: texto,
            registro: Date.now()
        }).then((c) => {
            if(c){
                Anime.findById(id).select('comentarios').then((anime) => {
                    if(anime){
                        anime.markModified('comentarios');
                        anime.comentarios.push(c._id);
                        anime.save();
                        return res.send({comentario: c});
                    }
                });
            }
        });
    }

    if(tipo === 3){
        await Comentario.findById(id).select('respostas').then((cPai) => {
            if(cPai){
                if(!cPai.isResposta){
                    Comentario.create({
                        autor: req.userData._id,
                        texto: texto,
                        isResposta: true,
                        registro: Date.now()
                    }).then((c) => {
                        if(c){
                            cPai.markModified('respostas');
                            cPai.respostas.push(c._id);
                            cPai.save();
                            return res.send({comentario: c});
                        }
                    });
                }else{
                    return res.send({comentario: null});
                }
            }
        });
    }
}