const mongoose = require('../config/database');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UpdateSchema = new Schema({
    idUpdate: ObjectId,
    version: {
        type: Number,
        require: true
    },
    text: {
        type: String,
        require: true
    }
});

mongoose.model('update', UpdateSchema);

module.exports = mongoose.model('update');