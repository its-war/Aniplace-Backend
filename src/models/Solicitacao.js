const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SolicitacaoSchema = new Schema({
    idSolicitacao: ObjectId,
    de: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    registro: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        default: 0
    }
});

mongoose.model('solicitacao', SolicitacaoSchema);

module.exports = mongoose.model('solicitacao');