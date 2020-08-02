const express = require('express');
const Message = require('../models/messageSchema');
const router = express.Router();
const validator = require("email-validator");
const sanitizer = require('sanitizer');



// GET
router.get('/', (req,res) => {
    Message.find({}, (err,msg) => {
        res.send(msg)
    });
})

//GET ALL MESSAGES FROM @EMAIL
router.get('/:email', (req,res) => {
    Message.find({email : req.params.email}, (err,msg) => {
        res.send(msg);
    })
})

router.post('/send', async (req,res) => {
    const { email, content } = req.body;
    const isEmailOk = validator.validate(email);
    const sanitizedContent = sanitizer.sanitize(content);
    if(isEmailOk) {
        const newMessage = new Message({email, content: sanitizedContent});
        await newMessage.save();
        res.send(newMessage);
    } else {
        res.send('Email incorrect');
    }
})

module.exports = router;