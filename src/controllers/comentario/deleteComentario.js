const Comentario = require('../../models/Comentario');
module.exports = async (req, res) => {
    let id = req.body.id;
    if(id.length !== 24){
        return res.send({delete: false});
    }

    await Comentario.findById(id).select('autor respostas').then( async(c) => {
        if(c){
            if(c.autor.toString() !== req.userData._id.toString()){
                return res.send({delete: false});
            }

            if(c.respostas.length > 0){
                await Comentario.deleteMany({_id: {$in: c.respostas}}).then();
            }
            await c.delete();
            return res.send({delete: true});
        }else{
            return res.send({delete: false});
        }
    });
}