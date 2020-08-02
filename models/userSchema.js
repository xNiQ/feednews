const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    posts : {
        type: Array,
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

module.exports = mongoose.model('User', UserSchema);