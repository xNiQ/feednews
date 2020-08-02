const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
})

module.exports = mongoose.model('Message', MessageSchema)