const express = require("express");
const router = express.Router();
const { verify_token } = require('../verification/verify');

router.post('/post', verify_token, (req, res, next)=>{
    
    const post = {
        subject: req.body.subject,
        author: req.body.author,
        desc: req.body.desc
    }
    res.status(200).json(post);
    next();
});

module.exports = router;