const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        required: true,
        default: false
    },
    current_room: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema)