const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

router.get('/', (req,res) => {
    User.find({}, (err, users) => {
        res.json(users);
    })
})

router.post('/create', (req,res) => {
    const { login, password, nickname } = req.body;
    if((login && password && nickname)) {
        User.find({login}, (err,usr) => {
            if(usr.length > 0) {
                res.status(403).send({
                    error : "Login has been already taken!"
                })
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    const newUser = new User({
                        login,
                        password:hash,
                        nickname
                    });
    
                    newUser.save(null, (err, user) => {
                        const payload = user.id;
                        const token = jwt.sign({payload}, process.env.SECRET_TOKEN, {expiresIn: '12h'});
                        res.set({
                            'authorization' : token,
                            'x-access-token' : token
                        }).status(200).send({user})
                    })
                })
            }
        })
    } else {
        res.send('Name, email and password is required!')
    }

})

router.post('/auth', (req,res) => {
    const { login, password } = req.body;
    User.find({login}, (err,usr) => {
        if(!usr.length > 0) {
            res.send({success: false, error: "Invalid login or password."});
        } else {
            bcrypt.compare(password, usr[0].password, (err,result) => {
                if(!result) {
                    res.send({success: false, error: "Invalid login or password!"});
                } else {
                    const payload = usr[0].id
                    const token = jwt.sign({payload}, process.env.SECRET_TOKEN, {expiresIn: '3h'});
                    res.set({
                        'authorization' : token,
                        'x-access-token' : token})
                        .send({success: true, token});
                }
            })
        }
    })
})

// MODIFY USER
router.post('/change', (req,res) => {
    let { _id, change, changeTo } = req.body;
    User.findById(_id, async (err,usr) => {
        if(err) { console.log(err) };
        usr[change] = changeTo;
        await usr.save();
        res.send(usr)
    })
})

//GET User by ID
router.get('/:id', (req,res) => {
    User.findById(req.params.id, (err,usr) => {
        if(err) { console.log(err) };
        res.send(usr);
    })
})


module.exports = router;