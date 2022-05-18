const nodemailer = require('nodemailer');
module.exports = {
    enviarEmail: function(para, assunto, chave){
        let remetente = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAILADM,
                pass: process.env.SENHAADM
            }
        });
        let email = {
            from: "aniplace.contato@gmail.com",
            to: para,
            subject: assunto,
            html: '<p>Código: ' + chave + '</p>'
        };
        remetente.sendMail(email, (err) => {
            console.log(err);
        });
    }
};