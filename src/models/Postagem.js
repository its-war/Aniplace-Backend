const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostagemSchema = new Schema({
    idPostagem: ObjectId,
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    texto: {
        type: String,
        default: ''
    },
    imagem: {
        type: String,
        default: ''
    },
    registro: {
        type: String,
        require: true
    },
    curtidas: [
        {
            type: Schema.Types.ObjectId,
            ref: 'usuario'
        }
    ],
    comentarios: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comentario'
        }
    ],
    compartilhado: {
        type: Boolean,
        default: false
    },
    postOrigem: {
        type: Schema.Types.ObjectId,
        ref: 'postagem'
    },
    compartilhamentos: {
        type: Number,
        default: 0
    }
});

PostagemSchema.plugin(mongoosePaginate);

mongoose.model('postagem', PostagemSchema);

module.exports = mongoose.model('postagem');