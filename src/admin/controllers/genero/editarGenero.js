const Genero = require('../../../models/Genero');

module.exports = (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let descricao = req.body.descricao;

    Genero.findById(id, (err, doc) => {
        if(err){
            res.send({cadastro: false, msg: "Edição não efetuada, tente novamente mais tarde."});
        }else{
            doc.nome = nome;
            doc.descricao = descricao;
            doc.save();
            res.send({cadastro: true});
        }
    })
}