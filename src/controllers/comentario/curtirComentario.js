const Comentario = require('../../models/Comentario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({curtiu: false});
    }

    await Comentario.findById(id).select('curtidas').then((c) => {
        if(c){
            for(let i = 0; i < c.curtidas.length; i++){
                if(c.curtidas[i].toString() === req.userData._id.toString()){
                    return res.send({curtiu: false});
                }
            }
            c.markModified('curtidas');
            c.curtidas.unshift(req.userData._id);
            c.save();
            return res.send({curtiu: true});
        }else{
            return res.send({curtiu: false});
        }
    });
}