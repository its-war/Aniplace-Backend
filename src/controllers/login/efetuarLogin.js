require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const tokenReq = req.headers['x-access-token'];

    jwt.verify(tokenReq, process.env.SECRET, (err, decoded) => {
        if(!err){
            return res.sendStatus(401);
        }
    });
    const token = jwt.sign({chave: req.user.chave}, process.env.SECRET, {
        expiresIn: req.lembrar ? '7d' : '1h'
    });
    req.headers['x-access-token'] = token;
    let update = {
        enabled: false,
        text: ''
    };
    if(req.user.version < req.update.version){
        update = {
            enabled: true,
            text: req.update.text
        }
    }
    return res.json({
        autorizado: true,
        token: token,
        user: {
            id: req.user._id,
            fistname: req.user.nome.split(' ')[0],
            foto: req.user.foto,
            ativo: req.user.ativo
        },
        msg: req.msg,
        update: update
    });
};