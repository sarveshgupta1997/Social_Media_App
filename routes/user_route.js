const express = require("express");
const mongoose =require("mongoose")
const {UserModel} = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userRoute= express.Router();

// Get all users
userRoute.get("/",async (req,res)=>{
    try {
        let users = await UserModel.find();        
        res.status(200).send({msg:"All Users",users})
    } catch (error) {
        res.send({err:"Error while fetching users"});
        console.log({err:error.message})
    }
})



// User Friends
userRoute.get("/:id/friends",async (req,res)=>{
    try {
        let id= req.params.id;
        let user = await UserModel.findOne({_id:id});
        res.status(200).send({msg:"User Frriends List",friends:user.friends});
    } catch (error) {
        res.send({err:"Error while fetching user friends"});
        console.log({err:error.message})
    }
})


// User Login
userRoute.post("/login",async (req,res)=>{
    try {
        let {email,password}=req.body;
        let user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(result){
                    let token = jwt.sign({userId:user[0]._id},process.env.seceretKey);
                    res.send({msg:"User Logged in",token:token})
                }else{
                    res.send({err:"Wrong Credentials"});
                }
            })
        }else{
            res.send({err:"Wrong Credentials"})
        }
        
    } catch (error) {
        res.send({err:"Error while logging in user"});
        console.log({err:error.message})
    }
})


module.exports={userRoute};