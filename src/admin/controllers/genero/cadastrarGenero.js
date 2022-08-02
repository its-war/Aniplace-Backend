const Genero = require('../../../models/Genero');

module.exports = (req, res) => {
    let nome = req.body.nome;
    let descricao = req.body.descricao;

    new Genero({
        nome: nome,
        descricao: descricao
    }).save().then(() => {
        res.send({cadastro: true});
    }).catch((err) => {
        if(err){
            return res.send({cadastro: false, msg: "Falha ao cadastrar, tente novamente mais tarde."});
        }
    });
}