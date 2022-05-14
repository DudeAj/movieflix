const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const watchlist = new Schema({
    userid: {
        type: String,
        required: true,
    },
    itemId: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    watched:{
        type: Boolean,
        require:true,
        default: false
    }
}, { timestamps: true });

const watchListModel = new mongoose.model('Watchlist', watchlist);

module.exports = watchListModel;
