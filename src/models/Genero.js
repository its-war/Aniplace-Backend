const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GeneroSchema = new Schema({
    idGenero: ObjectId,
    nome: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    }
});

mongoose.model('genero', GeneroSchema);

module.exports = mongoose.model('genero');