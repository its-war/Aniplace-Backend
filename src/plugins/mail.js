const nodemailer = require('nodemailer');
const remetente = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secureConnection: false,
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: process.env.EMAILADM,
        pass: process.env.SENHAADM
    }
});
module.exports = {
    enviarEmail: function(para, assunto, chave, url, nome, userEmail, usuario){
        let email = {
            from: "aniplace.contato@hotmail.com",
            to: para,
            subject: assunto,
            html: '<h1>AniPlace Contato</h1>' +
                '<p>' +
                'Dados cadastrados:<br/>' +
                '<strong>Nome:</strong> ' + nome +
                '<br/><strong>E-Mail:</strong> ' + userEmail +
                '<br/><strong>Usuário:</strong> ' + usuario +
                '<br/></p>' +
                '<p>' +
                '<a href="'+ url + chave +'">Clique aqui</a> para ativar sua conta.<br/>' +
                'Se você não solicitou cadastro em AniPlace, ignore este e-mail.' +
                '</p>'
        };
        remetente.sendMail(email, (err) => {
            if(err !== null) console.log(err);
        });
    },

    solicitouNovaSenha: function(para, assunto, chave, url){
        let email = {
            from: "aniplace.contato@hotmail.com",
            to: para,
            subject: assunto,
            html: '<h1>AniPlace Contato</h1>' +
                '<p>' +
                '<a href="'+ url + chave +'">Clique aqui</a> para ativar sua nova senha e fazer login.<br/>' +
                'Se você não solicitou esta alteração de senha, responda este e-mail para nos ajudar a proteger sua conta.' +
                '</p>'
        };
        remetente.sendMail(email, (err) => {
            if(err !== null) console.log(err);
        });
    }
};