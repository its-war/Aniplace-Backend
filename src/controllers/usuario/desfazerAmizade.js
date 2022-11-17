const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({desfazer: false});
    }

    await Usuario.findById(id).then((u) => {
        if(u){
            u.markModified('amigos');
            for(let i = 0; i < u.amigos.length; i++){
                if(u.amigos[i].toString() === req.userData._id.toString()){
                    u.amigos.splice(i, 1);
                    u.save();
                    req.io.to(u.idSocket).emit('desfazerAmizade', {id: req.userData._id});
                }
            }
        }
    });

    await Usuario.findById(req.userData._id).then((u) => {
        if(u){
            u.markModified('amigos');
            for(let i = 0; i < u.amigos.length; i++){
                if(u.amigos[i].toString() === id.toString()){
                    u.amigos.splice(i, 1);
                    u.save();
                }
            }
        }
    });

    return res.send({desfazer: true});
}