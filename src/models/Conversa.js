const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ConversaSchema = new Schema({
    idConversa: ObjectId,
    mensagens: [
        {
            type: Schema.Types.ObjectId,
            ref: 'mensagem'
        }
    ],
    participantes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'usuario'
        }
    ]
});

mongoose.model('conversa', ConversaSchema);

module.exports = mongoose.model('conversa');