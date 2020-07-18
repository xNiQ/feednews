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

// Delete post
router.delete('/delete/:slug', auth, (req,res) => {
    const slug = req.params.slug;

    Post.findOneAndDelete({slug}, (err,post) => {
        if(err) { console.log(err) };
        res.send({
            'success' : true,
            'deletedPost' : post
        })
    })
})

//POST Post
router.post('/create', auth, async (req,res) => {
    let { title, titleImg, tag, content, user} = req.body;

    let postDetails = {
        title,
        titleImg,
        content,
	    tag,
        user
    }

    postDetails.slug = slugify(postDetails.title);

    Post.find({slug : postDetails.slug}, async (err,post) => {
        if(post.length > 0) {
            res.send({
                'success' : false,
                'info': 'Post o takim tytule już istnieje'
            })
        } else {
            let newPost = new Post(postDetails);
            await newPost.save();
                res.send(newPost)
        }
    })
});

//GET Post by ID
router.get('/:slug', (req,res) => {
    Post.find({slug: req.params.slug}, (err,post) => {
        res.send(post);
    });
})

router.post('/change', auth, (req,res) => {
    let { _id,titleImg, tag, content, user} = req.body;
    Post.findByIdAndUpdate(_id, {titleImg, tag, content, user}, (err,response) => {
        if(err) {
            throw new Error(err)
        }
        res.send(response);
    })
});


module.exports = router;
