const Usuario = require('../models/Usuario');
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('saveIdSocket', (data) => {
            Usuario.findById(data.id).then((user) => {
                user.markModified('idSocket');
                user.idSocket = socket.id;
                user.save();
            });
        });
    });
}