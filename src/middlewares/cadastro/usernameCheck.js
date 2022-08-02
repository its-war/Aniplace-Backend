const Usuario = require('../../models/Usuario');

module.exports = (req, res, next) => {
    let nomeusuario = req.body.nomeusuario;

    nomeusuario = nomeusuario.split('');
    let novoNomeUsuario = "";

    for(let i = 0; i < nomeusuario.length; i++){
        if(nomeusuario[i].charCodeAt() < 48){
            if(nomeusuario[i].charCodeAt() !== 46){
                nomeusuario[i] = "";
            }
        }else if(nomeusuario[i].charCodeAt() > 57 && nomeusuario[i].charCodeAt() < 95){
            nomeusuario[i] = "";
        }else if(nomeusuario[i].charCodeAt() === 96){
            nomeusuario[i] = "";
        }else if(nomeusuario[i].charCodeAt() > 122){
            nomeusuario[i] = "";
        }
        novoNomeUsuario = novoNomeUsuario.toLowerCase() + nomeusuario[i].toLowerCase();
    }

    Usuario.findOne({username: novoNomeUsuario}, (err, obj) => {
        if(obj){
            return res.send({cadastro: false, msg: "Nome de usuário já está em uso."});
        }else{
            req.username = novoNomeUsuario;
            next();
        }
    });
}