const Postagem = require('../../models/Postagem');
const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({curtidas: []});
    }

    await Postagem.findById(id).select('curtidas').populate('curtidas', 'nome foto', Usuario).then((post) => {
        if(post){
            return res.send({curtidas: post.curtidas});
        }else{
            return res.send({curtidas: []});
        }
    });
}