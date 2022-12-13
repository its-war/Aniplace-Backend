const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotificationSchema = new Schema({
    idNotification: ObjectId,
    registro: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    de: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    action: {
        type: Number,
        require: true
    },
    /*
    * ACTIONS - representa o tipo de notificação
    * 1 - solicitação de amizade aceita
    * */
    dataPost: {
        type: Schema.Types.ObjectId,
        ref: 'postagem'
    },
    dataComment: {
        type: Schema.Types.ObjectId,
        ref: 'comentario'
    },
    dataAnime: {
        type: Schema.Types.ObjectId,
        ref: 'anime'
    }
    /*
    * Os campos 'data' são para suprir todos os tipos de notificações
    * Comentários em animes e posts
    * Curtidas e compartilhamentos de posts
    * Solicitações de amizade aceitas (nesse caso, não será usando nenhum dos 'data' acima)
    */
});

mongoose.model('notification', NotificationSchema);

module.exports = mongoose.model('notification');