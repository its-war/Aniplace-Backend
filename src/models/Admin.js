const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AdminSchema = new Schema({
    idAdmin: ObjectId,
    chave: {
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    }
});

mongoose.model('admin', AdminSchema);

module.exports = mongoose.model('admin');