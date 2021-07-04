const mongoose = require("mongoose");

const postSchema=new mongoose.Schema({
   author:{type:String,required:true},
   caption:{type:String,required:true},
   uid:String,
   postImage:String,
   userImage:String,
   likes:{type:Number,default:0},
   likedBy:{type:Array},
   comments:[{
       comment:{type:String},
       commentator:{type:String},
       commentatorImage:{type:String}
   }],
   date:{type:Date,default:Date.now()},
});

const Post=mongoose.model("Post",postSchema)
module.exports=Post