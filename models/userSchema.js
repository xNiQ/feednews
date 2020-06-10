const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const salt = 10;

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

// UserSchema.pre('save', function(next) {                                                                                                                                        
//     if(this.password) {                                                                                                                                                        
//         var salt = bcrypt.genSaltSync(10)                                                                                                                                     
//         this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
//     }                                                                                                                                                                          
//     next()                                                                                                                                                                     
// })   

module.exports = mongoose.model('User', UserSchema);