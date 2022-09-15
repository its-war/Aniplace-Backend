const Comentario = require('../../models/Comentario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({descurtiu: false});
    }

    await Comentario.findById(id).select('curtidas').then((c) => {
        if(c){
            for(let i = 0; i < c.curtidas.length; i++){
                if(c.curtidas[i].toString() === req.userData._id.toString()){
                    c.markModified('curtidas');
                    c.curtidas.splice(i, 1);
                    c.save();
                    return res.send({descurtiu: true});
                }
            }
            return res.send({descurtiu: false});
        }else{
            return res.send({descurtiu: false});
        }
    });
}