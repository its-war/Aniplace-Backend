const Usuario = require('../../models/Usuario');
module.exports = (req, res) => {
    let users = [];
    let user;
    Usuario.find().sort({acessos: "desc"}).limit(10).then((docs) => {
        for (let i = 0; i < docs.length; i++){
            user = {
                _id: docs[i]._id,
                nome: docs[i].nome
            }
            users.push(user);
        }
        res.send(users);
    });
}