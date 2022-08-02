const Usuario = require("../../models/Usuario");
const bcrypt = require('bcryptjs');
const mailer = require('../../plugins/mail');
const jwt = require('jsonwebtoken');
const datahora = require('../../plugins/datahora');
module.exports = (req, res) => {
    let nome = req.body.nome;
    let email = req.email;
    let nomeusuario = req.username;
    let senha = req.body.senha;
    let senhaRepetida = req.body.senharepetida;
    let version = req.version;

    nome = nome.split(" ");
    if(nome.length < 2){
        return res.send({cadastro: false, msg: "Necessário pelo menos um nome e um sobrenome.", erros: null});
    }

    let novoNome = '';
    for(let i = 0; i < nome.length; i++){
        if(nome[i].length <= 2 || nome[i].length > 250){
            return res.send({cadastro: false, msg: "Nome precisa ter mais de 2 dígitos.\n" +
                    "Se seu caso é especial, mande-nos um e-mail explicando sua situação.\n\n" + process.env.EMAILADM, erros: null});
        }else{
            novoNome = novoNome + nome[i].charAt(0).toUpperCase() + nome[i].substring(1) + " ";
        }
    }

    nome = novoNome.trim();

    if(nome.length < 2 || nome.length > 250){
        return res.send({cadastro: false, msg: "Nome inválido.", erros: null});
    }

    if(senha.length < 8 || senha !== senhaRepetida || senha.length > 250){
        return res.send({cadastro: false, msg: "Senha não pode ter menos de 8 dígitos.", erros: null});
    }
    let sal = bcrypt.genSaltSync(10);
    const senhaHash = bcrypt.hashSync(senha, sal);

    sal = bcrypt.genSaltSync(10);
    const chave = bcrypt.hashSync(Date.now() + email + Math.random(), sal);

    let registro = datahora.getData() + " às " + datahora.getHora();

    new Usuario({
        nome: nome,
        email: email,
        username: nomeusuario,
        senha: senhaHash,
        chave: chave,
        registro: registro,
        version: version
    }).save().then(() => {
        const token = jwt.sign({email: email, chave: chave}, process.env.SECRET);
        //req.secureProtocol
        let fullUrl = req.protocol + '://' + req.get('host') + '/usuario/ativar/';
        mailer.enviarEmail(email, "Ative sua conta", token, fullUrl, nome, req.email, req.username);
        return res.send({cadastro: true});
    }).catch((err) => {
        if(err){
            return res.send({cadastro: false, msg: "Falha ao cadastrar, tente novamente mais tarde."});
        }
    });
};