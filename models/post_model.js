const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    user: { type: String, ref: 'User' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: String, ref: 'User' }],
    comments: [{
      user: { type: String, ref: 'User' },
      text: String,
      createdAt: Date
    }]
  })

const PostModel = mongoose.model("post",postSchema);

module.exports={PostModel};