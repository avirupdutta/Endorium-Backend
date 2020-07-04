const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    created_by_user: {
        type: String,
        required: true
    },
    room_no: {
        type: String,
        required: true
    },
    upvote: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Message', messageSchema)