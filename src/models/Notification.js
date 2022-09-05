const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotificationSchema = new Schema({
    idNotification: ObjectId,
    texto: {
        type: String,
        require: true
    },
    registro: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 0
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
    * ACTIONS
    * 1 - quando for clicado nessa notificação, o frontend deve abrir o perfil do usuário que aceitou a solicitação
    * */
    metadado: {
        type: String,
        default: ''
    }
});

mongoose.model('notification', NotificationSchema);

module.exports = mongoose.model('notification');