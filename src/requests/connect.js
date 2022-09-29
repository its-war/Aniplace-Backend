const Usuario = require('../models/Usuario');
const Conversa = require('../models/Conversa');
const Mensagem = require('../models/Mensagem');
module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.emit('firstConnection', {socket: socket.id});

        socket.on('saveIdSocket', (data) => {
            Usuario.findById(data.id).then((user) => {
                user.markModified('idSocket');
                user.idSocket = socket.id;
                user.save();
                console.log(socket.id);
            });
        });

        socket.on('newMensagem', async (data) => {
            let msg = null;
            await Conversa.findById(data.idConversa).populate([
                {
                    path: 'participantes',
                    model: Usuario,
                    select: 'nome foto idSocket'
                },
                {
                    path: 'mensagens',
                    model: Mensagem
                }
            ]).then( async (conversa) => {
                if(conversa){
                    socket.join(data.idConversa, conversa.participantes[0].idSocket);
                    socket.join(data.idConversa, conversa.participantes[1].idSocket);
                    await Mensagem.create({
                        autor: data.idUser,
                        texto: data.msg,
                        registro: Date.now()
                    }).then( async (mensagem) => {
                        if(mensagem){
                            msg = mensagem;
                            conversa.markModified('mensagens');
                            conversa.mensagens.push(mensagem._id);
                            await conversa.save();
                            await Usuario.findById(data.idUser).select('nome foto idSocket').then((u) => {
                                mensagem.autor = u;
                                io.to(conversa.participantes[0].idSocket).to(conversa.participantes[1].idSocket).emit('frontNewMensagem', {
                                    idConversa: data.idConversa,
                                    mensagem: msg
                                });
                            });
                        }
                    });
                }
            });
        });
    });
}