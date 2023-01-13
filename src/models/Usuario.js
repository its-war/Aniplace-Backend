const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    idUser: ObjectId,
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    chave: {
        type: String,
        require: true
    },
    registro: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        default: null
    },
    capa: {
        type: String,
        default: null
    },
    ativo: {
        type: Number,
        default: 0
    },
    acessos: {
        type: Number,
        default: 0
    },
    version: {
        type: Number,
        default: true
    },
    apelido: {
        type: String,
        default: ''
    },
    nascimento: {
        type: Date,
        default: null
    },
    sexo: {
        type: Number,
        default: 0
    },
    pronome: {
        type: Number,
        default: 0
    },
    animeFavorito: {
        type: Schema.Types.ObjectId,
        ref: 'anime'
    },
    estado: {
        type: String,
        default: null
    },
    cidade: {
        type: String,
        default: null
    },
    biografia: {
        type: String,
        default: ''
    },
    amigos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'usuario'
        }
    ],
    idSocket: {
        type: String,
        default: ''
    },
    online: {
        type: Boolean,
        default: false
    },
    fistLogin: {
        type: Boolean,
        default: true
    }
});

mongoose.model('usuario', UserSchema);

module.exports = mongoose.model('usuario');