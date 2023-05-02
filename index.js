const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose =require("mongoose")
const {UserModel} = require("./models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {connection} = require("./config/db")
const {userRoute} = require("./routes/user_route")
const {postRoute} = require("./routes/post_route")
const {authenticator} = require("./middlewares/authentication")

const app= express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send({msg:"Social Media App - Base API Endpoint"})
})

// User Register
app.post("/api/register",async (req,res)=>{
    try {
        let {name,email,dob,password,posts,friends,friendRequests}=req.body;
        let salt = +process.env.salt;
        bcrypt.hash(password,salt,async(err,sec_pass)=>{
            if(err){
                console.log("err")
            }else{
                let user = new UserModel({name,email,dob,posts,friends,friendRequests,password:sec_pass});
                await user.save();
                res.status(201).send({msg:"User Added",user});
            }
        })
    } catch (error) {
        res.send({err:"Error while registering user"});
        console.log({err:error.message})
    }
})
app.use("/api/users",userRoute);
app.use(authenticator);
app.use("/api/posts",postRoute);

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db")
    } catch (error) {
        console.log({err:error.message})
    }
    console.log("server running at port 4400")
})

