const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProgressoSchema = new Schema({
    idProgresso: ObjectId,
    tempo: {
        type: Number,
        require: true
    },
    episodio: {
        type: Number,
        require: true
    },
    temporada: {
        type: Number,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'anime'
    }
});

mongoose.model('progresso', ProgressoSchema);

module.exports = mongoose.model('progresso');