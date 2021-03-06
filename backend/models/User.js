const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    hashPassword:{type:String,required:true},
    profilePic:String
});
const User=mongoose.model("User",userSchema);

module.exports=User;