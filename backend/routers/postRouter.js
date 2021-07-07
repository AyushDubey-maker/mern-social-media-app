const auth=require("../middleware/auth")
const Post=require("../models/Post")
const multer=require("multer")
const User=require("../models/User")
const router=require("express").Router()
// setting up the multer code for posts upload by user.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "../frontend/client/public/posts");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
const uploadPost=multer({storage:storage})

router.post("/",auth,uploadPost.single("postImage"),async(req,res)=>{
    try{
        const {author,userImage,uid,caption,date}=req.body;
        const postImage=req.file.filename;
        if(postImage){
            let post=new Post({
                author,
                uid,
                caption,
                date,
                postImage,
                userImage
            });
            post=await post.save()
            res.send(post)
        }else{
            let post=new Post({  
                author,
                uid,
                userImage,
                caption,
                date});
                post=await post.save()
                res.send(post)
        }
    }catch(err){
        console.log(err)
        res.status(500).send()
    }
})

 router.get("/",auth,async(req,res)=>{

 try{
      const posts=await Post.find().sort({date:-1});

   
      res.send(posts)

 }catch(err){
     res.status(500).send("Error: "+error.message)
 }
 })
 router.get("/profile",auth,async(req,res)=>{
    const user=req.user;
    try{
         const posts=await Post.find().sort({date:-1});
         const filteredPosts=posts.filter((post)=>post.uid===user)

      
         res.send(filteredPosts)
   
    }catch(err){
        res.status(500).send("Error: "+error.message)
    }
    })

 // Delete Post
 router.delete("/delete/:id",async(req,res)=>{
     const id=req.params.id;
     await Post.findByIdAndRemove(id)
     .then(()=>res.send("Blog Deleted"))
     .catch((err)=>res.send(err))
 })
 // Like Post
 router.post("/like/:id",async(req,res)=>{
     const {user_id}=req.body;
     const id=req.params.id;
     
     const post=await Post.findById(id)
     if(post.likedBy.includes(user_id)){
        post.likes--;
        const arrayIndex = post.likedBy.indexOf(user_id); 
        post.likedBy.splice(arrayIndex,1)
        post.save((error)=>{
            if(error){
                res.json({success:false,message:"Something error"})
            }else{
                res.json({success:true,message:"Post Liked"})
            }
        })
      
    }else{
         post.likes++;
         post.likedBy.push(user_id);
         post.save((err)=>{
             if(err){
                 res.json({success:false,message:"Something error"})
             }else{
                 res.json({success:true,message:"Post Liked"})
             }
         })

     }
 })
 // Post Comment
 router.post('/comment/:id',auth,async(req,res)=>{
     const {user_id}=req.body
     const id=req.params.id
     const post=await Post.findById({_id:id})
     const user=await User.findById({_id:user_id})

     try{
         post.comments.push({
            comment:req.body.comment,
            commentator:user.username,
            commentatorImage:user.profilePic 
         })
         post.save((err)=>{
             if(err){
                 console.log(err.message)
             }else{
                 res.json({success:true,message:"Comment Saved"})
             }
         })
     }catch(err){
         console.log(err.message)
     }
 })

 // Delete Comment
 router.put('/deletecomment/:id',async(req,res)=>{
    const id=req.params.id 
    const {comment_id}=req.body

     const post=await Post.findById({_id:id});
     post.comments.map((comment)=>{
         if(comment._id==comment_id){
             const arrayIndex=post.comments.indexOf(comment)
             post.comments.splice(arrayIndex,1)
             post.save()
         }
     })
 })

module.exports=router