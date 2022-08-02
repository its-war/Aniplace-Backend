const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EpisodioSchema = new Schema({
    idEpisodio: ObjectId,
    nome: {
        type: String,
        default: null
    },
    numero: {
        type: Number,
        require: true
    },
    thumb: {
        type: String,
        require: true
    },
    resumo: {
        type: String,
        default: null
    },
    linkFullHD: {
        type: String,
        default: null
    },
    linkHD: {
        type: String,
        default: null
    },
    linkSD: {
        type: String,
        default: null
    },
    online: {
        type: String,
        require: true
    }
});

mongoose.model('episodio', EpisodioSchema);

module.exports = mongoose.model('episodio');