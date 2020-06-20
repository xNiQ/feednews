const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const User = require('../models/userSchema');
const Post = require('../models/postSchema');
const auth = require('../middlewares/authenticateToken');

// GET Post
router.get('/', (req,res) => {
    Post.find({}, (err,post) => {
        if(err) { console.log(err) };
        res.send(post);
    })
})

//POST Post
router.post('/create', auth, async (req,res) => {
    let { title, titleImg, content, user} = req.body;

    let postDetails = {
        title,
        titleImg,
        content,
        user
    }

    postDetails.slug = slugify(postDetails.title);

    let newPost = new Post(postDetails);
        User.findById(newPost.user, async (err,usr) => {
            usr.posts.push(newPost._id);
            await usr.save();
        })
    await newPost.save();
        res.send(newPost)
});

//GET Post by ID
router.get('/:slug', (req,res) => {
    Post.find({slug: req.params.slug}, (err,post) => {
        res.send(post);
    });
})


module.exports = router;