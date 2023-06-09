const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req,res,next)=>{
    let token = req.headers.token
    console.log(token)
    if(token){
        let decode = jwt.verify(token, process.env.seceretKey, function(err, decoded) {
            if(decoded){
                req.body.user=decoded.userId;
                next();
            }else{
                res.send({err:"Please Login First"});
            }
          });
    }else{
        res.send({err:"Please Login First"});
    }
}

module.exports={authenticator};