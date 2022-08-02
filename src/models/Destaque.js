const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DestaqueSchema = new Schema({
    idDestaque: ObjectId,
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'anime'
    },
    foto: {
        type: String,
        require: true
    },
    animeFoto: {
        type: Boolean,
        require: true
    },
    cliques: {
        type: Number,
        default: 0
    }
});

mongoose.model('destaque', DestaqueSchema);

module.exports = mongoose.model('destaque');