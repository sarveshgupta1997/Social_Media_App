const express = require("express");
const mongoose =require("mongoose")
const {PostModel} = require("../models/post_model");

const postRoute= express.Router();

postRoute.get("/", async(req,res)=>{
   try {
        let posts = await PostModel.find();
        res.status(200).send({"All Posts":posts});
   } catch (error) {
        res.send({err:error.message});
   }
})

postRoute.get("/:id", async(req,res)=>{
   try {
        let id=req.params.id;
            let post = await PostModel.find({_id:id});
            res.status(200).send({post});
   } catch (error) {
        res.send({err:error.message});
   }
})

// Post Create
postRoute.post("/",async (req,res)=>{
    try {
        let payload=req.body;
        let post = new PostModel(payload);
        await post.save();
        res.status(201).send({msg:"Post Added",post});
    } catch (error) {
        res.send({err:"Error while creating post"});
        console.log({err:error.message})
    }
})

// Post Like
postRoute.patch("/:id/like",async (req,res)=>{
    try {
        let payload=req.body.user;
        let postId=req.params.id;
        let post = await PostModel.findByIdAndUpdate({_id:postId},{ $push: { likes: payload } });
        res.status(201).send({msg:"Like Added"});
    } catch (error) {
        res.send({err:"Error while creating post"});
    }
})
// Post Comment
postRoute.patch("/:id/comment",async (req,res)=>{
    try {
        let payload=req.body;
        let postId=req.params.id;
        let post = await PostModel.findByIdAndUpdate({_id:postId},{ $push: { comments: payload } });
        res.status(201).send({msg:"Comment Added"});
    } catch (error) {
        res.send({err:"Error while creating post"});
    }
})

// Post Update
postRoute.patch("/:id",async (req,res)=>{
    try {
        let payload=req.body;
        let postId=req.params.id;
        let note = await PostModel.findByIdAndUpdate({_id:postId},payload);
        res.status(204).send({msg:"Post Updated"});
    } catch (error) {
        res.send({err:"Error while creating post"});
    }
})

// Post Delete
postRoute.delete("/:id",async (req,res)=>{
    try {
        let postId=req.params.id;
        await PostModel.findByIdAndDelete({_id:postId});
        res.status(202).send({msg:"Post Deleted"});
    } catch (error) {
        res.send({err:"Error while creating post"});
    }
})


module.exports={postRoute};