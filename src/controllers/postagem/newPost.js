const Postagem = require('../../models/Postagem');
module.exports = async (req, res) => {
    if(req.file === undefined && req.body.texto === ''){
        return res.send({postagem: false});
    }

    let texto = req.body.texto !== '' ? req.body.texto : '';
    let imagem = req.file !== undefined ? req.file.filename : '';

    setTimeout(() => {
        Postagem.create({
            autor: req.userData._id,
            texto: texto,
            imagem: imagem,
            registro: Date.now()
        }).then((postagem) => {
            if(postagem){
                return res.send({postagem: true, post: postagem});
            }else{
                return res.send({postagem: false});
            }
        });
    }, 1000);
}