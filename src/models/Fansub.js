const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FansubSchema = new Schema({
    idFansub: ObjectId,
    nome: {
        type: String,
        require: true
    },
    foto: {
        type: String,
        default: null
    },
    descricao: {
        type: String,
        default: null
    },
    proprietario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    admins: [
        {type: Schema.Types.ObjectId, ref: 'usuario'}
    ]
});

mongoose.model('fansub', FansubSchema);

module.exports = mongoose.model('fansub');