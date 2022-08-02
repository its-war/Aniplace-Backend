const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TemporadaSchema = new Schema({
    idTemporada: ObjectId,
    periodoInicial: {
        type: Number,
        require: true
    },
    periodoFinal: {
        type: Number,
        default: 0
    },
    ano: {
        type: Number,
        require: true
    },
    anoFinal: {
        type: Number,
        default: 0
    },
    titulo: {
        type: String,
        default: null
    },
    estudio: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true
    },
    fansubs: [
        {type: Schema.Types.ObjectId, ref: 'fansub'}
    ],
    episodios: [
        {type: Schema.Types.ObjectId, ref: 'episodio'}
    ]
});

mongoose.model('temporada', TemporadaSchema);

module.exports = mongoose.model('temporada');