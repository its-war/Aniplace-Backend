const Usuario = require('../models/Usuario');
const Conversa = require('../models/Conversa');
const Mensagem = require('../models/Mensagem');
module.exports = (io) => {
    io.on('connection', async (socket) => {
        socket.emit('firstConnection', {socket: socket.id});

        socket.on('saveIdSocket', (data) => {
            Usuario.findById(data.id).populate({
                path: 'amigos',
                model: Usuario
            }).then((user) => {
                user.markModified('idSocket');
                user.markModified('online');
                user.idSocket = socket.id;
                user.online = true;
                user.save();
                for(let i = 0; i < user.amigos.length; i++){
                    socket.to(user.amigos[i].idSocket).emit('vistoOnline', {
                        idAmigo: user._id,
                        resend: true
                    });
                }
            });
        });

        socket.on('amigoOnline', async (data) => {
            await Usuario.findById(data.to).select('idSocket').then((u) => {
                if(u){
                    socket.to(u.idSocket).emit('vistoOnline', {
                        idAmigo: data.from,
                        resend: false
                    });
                }
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

        socket.on('disconnect', async () => {
            await Usuario.findOne({idSocket: socket.id}).populate({
                path: 'amigos',
                model: Usuario
            }).then((user) => {
                if(user){
                    user.markModified('idSocket');
                    user.markModified('online');
                    user.idSocket = '';
                    user.online = false;
                    user.save();
                    for(let i = 0; i < user.amigos.length; i++){
                        if(user.amigos[i].idSocket !== ''){
                            socket.to(user.amigos[i].idSocket).emit('offline', {
                                idAmigo: user._id
                            });
                        }
                    }
                }
            });
        });

        socket.on('avisoOnlineUser', async (data) => {
            console.log('user ' + socket.id);
            Usuario.findById(data.id).populate({
                path: 'amigos',
                model: Usuario
            }).then((user) => {
                for(let i = 0; i < user.amigos.length; i++){
                    socket.to(user.amigos[i].idSocket).emit('reVistoOnline', {
                        idAmigo: user._id
                    });
                }
            });
        });

        socket.on('visualizarMsg', async (data) => {
            await Conversa.findById(data.idConversa).select('mensagens').then((c) => {
                Mensagem.updateMany({
                    _id: c.mensagens
                }, {visto: true}).then( async() => {
                    await Usuario.findById(data.idUser).then((u) => {
                        socket.to(u.idSocket).emit('mensagemVista');
                    });
                });
            });
        });
    });
}