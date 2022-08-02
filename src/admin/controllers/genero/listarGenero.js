const Genero = require('../../../models/Genero');

module.exports = (req, res) => {
    let id = req.body.id;
    let nome = req.body.nome;
    let descricao = req.body.descricao;

    Genero.findById(id, (err, doc) => {
        if(err){
            res.send({genero: null, msg: "Listagem não efetuada, tente novamente mais tarde."});
        }else{
            res.send({genero: doc});
        }
    })
}