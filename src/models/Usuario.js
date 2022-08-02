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
    }
});

mongoose.model('usuario', UserSchema);

module.exports = mongoose.model('usuario');