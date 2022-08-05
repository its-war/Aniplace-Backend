const jwt = require('jsonwebtoken');
const Usuario = require('../../models/Usuario');
const EsqueceuSenha = require('../../models/EsqueceuSenha');
const datahora = require('../../plugins/datahora');
module.exports = async (req, res) => {
    let token = req.params.token;

    await jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err) {
            res.set('msg', 'Sua nova senha está ativa, faça login.');
            res.set('Access-Control-Expose-Headers', 'msg');
            res.redirect('/login');
        }

        await EsqueceuSenha.findById(decoded.chave).then((esqueceu) => {
            esqueceu.ativo = 1;
            esqueceu.registroAtivo = datahora.getData() + ' às ' + datahora.getHora();
            Usuario.findById(esqueceu.usuario).then((user) => {
                user.senha = esqueceu.senhaNova;
                user.save();
                esqueceu.save();
                res.set('msg', 'Sua nova senha está ativa, faça login.');
                res.set('Access-Control-Expose-Headers', 'msg');
                res.redirect('/login');
            });
        });
    });
}