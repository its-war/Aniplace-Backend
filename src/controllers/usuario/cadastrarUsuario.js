module.exports = (req, res) => {
    const conn = require('../../config/database');
    const bcrypt = require('bcryptjs');
    const mailer = require('../../plugins/mail');
    const jwt = require('jsonwebtoken');
    let sql = "insert into usuario values (default, ?,?,?,?,?, default);";
    let nome = req.body.nome;
    let email = req.body.email;
    let nomeusuario = req.body.nomeusuario;
    let senha = req.body.senha;
    let senhaRepetida = req.body.senharepetida;

    nome = nome.split(" ");
    if(nome.length < 2){
        return res.send("Nome inválido.");
    }

    let novoNome = '';
    for(let i = 0; i < nome.length; i++){
        if(nome[i].length < 2 || nome[i].length > 250){
            return res.send("Nome inválido.1");
        }else{
            novoNome = novoNome + nome[i].charAt(0).toUpperCase() + nome[i].substr(1) + " ";
        }
    }

    nome = novoNome.trim();

    if(nome.length < 2 || nome.length > 250){
        return res.send("Nome inválido.");
    }

    email = email.split('@');
    if(email.length !== 2){
        return res.send("E-Mail inválido.");
    }
    if(email[1] === "gmail.com" || email[1] === "outlook.com" || email[1] === "hotmail.com"){
        email = email[0] + '@' + email[1];
    }else{
        return res.send("E-Mail inválido.");
    }
    conn.query("select idusuario from usuario where email=?", email, (err, result, fields) => {
        if(result.length > 0){
            return res.send("E-Mail inválido.");
        }
    });

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
    conn.query("select idusuario from usuario where nomeusuario=?", novoNomeUsuario, (err, result, fields) => {
        if(result.length > 0){
            return res.send("Nome de usuário inválido.");
        }
    });


    if(senha.length < 8 || senha !== senhaRepetida || senha.length > 250){
        return res.send("Senha inválido.");
    }
    let sal = bcrypt.genSaltSync(10);
    const senhaHash = bcrypt.hashSync(senha, sal);

    sal = bcrypt.genSaltSync(10);
    const chave = bcrypt.hashSync(Date.now() + email + Math.random(), sal);

    conn.query(sql, [nome, email, novoNomeUsuario, senhaHash, chave], (err, result, fields) => {
        if(!err){
            console.log(result);
            const token = jwt.sign({email: email, chave: chave}, process.env.SECRET);
            let fullUrl = req.protocol + '://' + req.get('host') + '/usuario/ativar/';
            mailer.enviarEmail(email, "Ative sua conta", token, fullUrl);
            return res.sendStatus(200);
        }else{
            return res.send("Falha ao cadastrar.");
        }
    });
};