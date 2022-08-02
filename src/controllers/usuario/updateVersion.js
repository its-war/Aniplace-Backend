const Usuario = require('../../models/Usuario');
module.exports = (req, res) => {
    let id = req.body.id;
    Usuario.findById(id).then(async (doc) => {
        if(doc){
            doc.version = req.version;
            await doc.save();
            res.send({
                update: {
                    enabled: false,
                    text: []
                }
            });
        }else{
            res.send({erro: 'Usuário não encontrado.'});
        }
    });
}