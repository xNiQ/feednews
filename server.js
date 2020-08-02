const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const morgan = require('morgan')

const app = express();
const port = process.env.PORT || 5000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));app.use(cors());

mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    console.log(`db connected`)
});

//User routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

//Post routes
const postRoutes = require('./routes/post');
app.use('/post', postRoutes);

//Message routes
const messageRoutes = require('./routes/message');
app.use('/message', messageRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

module.exports = app;

