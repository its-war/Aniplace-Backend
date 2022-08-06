const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EpisodioSchema = new Schema({
    idEpisodio: ObjectId,
    numero: {
        type: Number,
        require: true
    },
    thumb: {
        type: String,
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
    }
});

mongoose.model('episodio', EpisodioSchema);

module.exports = mongoose.model('episodio');