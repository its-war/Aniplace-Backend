const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MensagemSchema = new Schema({
    idMensagem: ObjectId,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    texto: {
        type: String,
        require: true
    },
    registro: {
        type: String,
        require: true
    },
    visto: {
        type: Boolean,
        default: false
    }
});

mongoose.model('mensagem', MensagemSchema);

module.exports = mongoose.model('mensagem');