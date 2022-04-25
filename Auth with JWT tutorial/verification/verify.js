const express = require("express");
const JWT = require("jsonwebtoken");

module.exports.verify_token = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied!');

    try{
        const verify_token = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verify_token;
    }catch(error){
        res.status(400).send('invalid token');
    }

    next();

}