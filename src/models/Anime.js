const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AnimeSchema = new Schema({
    idAnime: ObjectId,
    nome: {
        type: String,
        require: true
    },
    nomeAlternativo: {
        type: String,
        default: ''
    },
    sinopse: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        default: ''
    },
    acessos: {
        type: Number,
        default: 0
    },
    ano: {
        type: Number,
        default: 0
    },
    generos: [
        {type: Schema.Types.ObjectId, ref: 'genero'}
    ],
    temporada: [
        {type: Schema.Types.ObjectId, ref: 'temporada'}
    ],
    nota: {
        type: Number,
        default: 0
    }
});

AnimeSchema.plugin(mongoosePaginate);

mongoose.model('anime', AnimeSchema);

module.exports = mongoose.model('anime');