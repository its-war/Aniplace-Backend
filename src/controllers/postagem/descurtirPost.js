const Postagem = require('../../models/Postagem');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({descurtir: false});
    }

    await Postagem.findById(id).select('curtidas').then((post) => {
        if(post){
            for(let i = 0; i < post.curtidas.length; i++){
                if(post.curtidas[i].toString() === req.userData._id.toString()){
                    post.markModified('curtidas');
                    post.curtidas.splice(i, 1);
                    post.save();
                    return res.send({descurtir: true});
                }
            }
            return res.send({descurtir: false});
        }else{
            return res.send({descurtir: false});
        }
    });
}