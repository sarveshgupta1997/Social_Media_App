const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    bio: String,
    posts: [{ type: String, ref: 'Post' }],
    friends: [{ type: String, ref: 'User' }],
    friendRequests: [{ type: String, ref: 'User' }]
  },{
    versionKey:false
  })

const UserModel = mongoose.model("user",userSchema);

module.exports={UserModel};