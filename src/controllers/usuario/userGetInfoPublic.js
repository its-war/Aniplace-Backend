const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    let id = req.params.id;
    if(id.length !== 24){
        return res.send({user: {}});
    }

    await Usuario.findById(id).select('nome foto registro apelido nascimento sexo pronome animeFavorito localidade biografia amigos online').then((user) => {
        return res.send({user: user});
    });
}