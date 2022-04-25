const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require('../models/userModel');


router.post('/register', async(req, res, next)=>{

    // check if email already exist

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(401).send('Email already exist');

    //generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const user = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({
            user: savedUser
        });
    
    } catch (error) {
        res.status(401).json({
            error_name: error.errors
        });
    }

    next();

});

router.post('/login', async(req, res, next)=>{
//if email exist
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(500).send('problem with email or password');

// check if pwd is valid
const valide_pass = await bcrypt.compare(req.body.password, user.password);
if(!valide_pass) return res.status(401).send('wrong password');

const secret = process.env.TOKEN_SECRET;
const token = JWT.sign({
    _id: req.body._id
}, secret);

res.header('auth-token', token);

res.status(200).json( {token:token, msg:'logged in successfully!'});
next();
});



module.exports = router;