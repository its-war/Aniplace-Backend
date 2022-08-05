const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EsqueceuSenhaSchema = new Schema({
    idEsqueceu: ObjectId,
    senhaAntiga: {
        type: String,
        require: true
    },
    senhaNova: {
        type: String,
        require: true
    },
    registroPedido: {
        type: String,
        require: true
    },
    registroAtivo: {
        type: String,
        default: ''
    },
    ativo: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
});

mongoose.model('esqueceusenha', EsqueceuSenhaSchema);

module.exports = mongoose.model('esqueceusenha');