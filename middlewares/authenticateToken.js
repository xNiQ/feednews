const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req,res,next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token) {
        res.status(403).send({error: 'Token does not exist!'});
    } else {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if(err) {
                res.status(403).send({error: 'Token invalid!'});
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}

module.exports = authenticateToken;