const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ComentarioSchema = new Schema({
    idComentario: ObjectId,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    texto: {
        type: String,
        require: true
    },
    curtidas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'usuario'
        }
    ],
    respostas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comentario'
        }
    ],
    isResposta: {
        type: Boolean,
        default: false
    }
});

mongoose.model('comentario', ComentarioSchema);

module.exports = mongoose.model('comentario');