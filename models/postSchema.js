const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    titleImg: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag : {
        type: String,
        required: true
    },
    slug: {
        type: String
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

module.exports = mongoose.model('Post', PostSchema);
