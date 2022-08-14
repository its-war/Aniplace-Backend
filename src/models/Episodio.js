const mongoose = require('../config/database');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EpisodioSchema = new Schema({
    idEpisodio: ObjectId,
    numero: {
        type: Number,
        require: true
    },
    temporada: {
        type: Number,
        require: true
    },
    thumb: {
        type: String,
        require: true
    },
    aberturaInicio: {
        type: Number,
        require: true
    },
    aberturaFim: {
        type: Number,
        require: true
    },
    encerramentoInicio: {
        type: Number,
        default: 0
    },
    encerramentoFim: {
        type: Number,
        default: 0
    },
    tempo: {
        type: Number,
        require: true
    },
    linkFullHD: {
        type: String,
        default: ''
    },
    linkHD: {
        type: String,
        default: ''
    },
    linkSD: {
        type: String,
        default: ''
    },
    online: {
        type: String,
        require: true
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'anime'
    }
});

EpisodioSchema.plugin(mongoosePaginate);

mongoose.model('episodio', EpisodioSchema);

module.exports = mongoose.model('episodio');