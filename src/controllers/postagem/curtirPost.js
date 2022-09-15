const Postagem = require('../../models/Postagem');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({erro: true});
    }

    await Postagem.findById(id).select('curtidas').then((post) => {
        if(post){
            for(let i = 0; i < post.curtidas.length; i++){
                if(post.curtidas[i].toString() === req.userData._id.toString()){
                    return res.send({curtida: false});
                }
            }
            post.markModified('curtidas');
            post.curtidas.unshift(req.userData._id);
            post.save();
            return res.send({curtida: true});
        }else{
            return res.send({erro: true});
        }
    });
}