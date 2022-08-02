const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RankingSchema = new Schema({
    idRanking: ObjectId,
    nota: {
        type: Number,
        require: true
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'anime'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
});

mongoose.model('ranking', RankingSchema);

module.exports = mongoose.model('ranking');