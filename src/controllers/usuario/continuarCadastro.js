const Usuario = require('../../models/Usuario');
module.exports = async (req, res) => {
    let dados = req.body.dados;
    console.log(dados);
    await Usuario.findById(req.userData._id).then((user) => {
        user.apelido = dados.apelido;
        user.nascimento = dados.nascimento ? new Date(dados.nascimento) : null;
        user.sexo = dados.orientationSex;
        user.pronome = dados.pronome;
        user.biografia = dados.biografia;
        user.foto = dados.foto;
        user.fistLogin = false;
        user.estado = dados.estado;
        user.cidade = dados.cidade;
        user.save();
        return res.send({atualizar: true})
    }).catch(() => {
        return res.send({atualizar: false});
    });
}