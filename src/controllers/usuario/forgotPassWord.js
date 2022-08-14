require('dotenv-safe').config();
const Usuario = require('../../models/Usuario');
const EsqueceuSenha = require('../../models/EsqueceuSenha');
const bcrypt = require('bcryptjs');
const datahora = require('../../plugins/datahora');
const mail = require('../../plugins/mail');
const jwt = require('jsonwebtoken');
module.exports = async (req, res) => {
    let usuario = req.body.nomeusuario;
    let email = req.body.email;
    let senha = req.body.senha;
    let senhaRepetida = req.body.senharepetida;

    if(senha.length < 8 || senhaRepetida.length < 8){
        return res.send({msg: 'Senha precisa ter pelo menos 8 dígitos.'});
    }

    if(senha.length > 250 || senhaRepetida.length > 250){
        return res.send({msg: 'Senha não pode ter mais de 250 dígitos.'});
    }

    if(senha !== senhaRepetida){
        return res.send({msg: 'As senhas devem ser iguais.'});
    }

    let sal = bcrypt.genSaltSync(10);
    const senhaHash = bcrypt.hashSync(senha, sal);

    await Usuario.find({
        email: email,
        username: usuario
    }).then(async (user) => {
        await EsqueceuSenha.create({
            senhaAntiga: user[0].senha,
            senhaNova: senhaHash,
            registroPedido: datahora.getData() + ' às ' + datahora.getHora(),
            usuario: user[0]._id
        }).then((esqueceu) => {
            let token = jwt.sign({chave: esqueceu._id}, process.env.SECRET, {expiresIn: '1h'});
            mail.solicitouNovaSenha(email, 'Solicitação de nova senha', token, process.env.URLBASE + '/usuario/esqueceuSenha/');
        });
    }).finally(() => {
        return res.send({msg: 'Se os dados fornecidos forem válidos, em até 1h você irá receber um link no e-mail para ativar a nova senha.'});
    });
}