const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userModel = new mongoose.model('User', user);

module.exports = userModel;
