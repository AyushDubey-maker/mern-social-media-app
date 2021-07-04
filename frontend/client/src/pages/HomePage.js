import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HomePostContent from '../components/HomePostContent'
import AuthContext from '../context/AuthContext'

function HomePage() {
    const  [posts,setPosts]=useState([])
    const {userData}=useContext(AuthContext)
    async function getPosts(){
        const postRes=await axios.get("http://localhost:5000/post/")
    setPosts(postRes.data)  

    }

    useEffect(()=>{
        getPosts()
    },[posts])
    return (
        <div>
           {posts.map((post)=>(
               <div key={post._id}>
               <HomePostContent photoId={post._id} userData={userData} photo={post} userPost={post.postImage} username={post.author} profilePic={post.userImage}/>
               </div>
           ))}
        </div>
    )
}

export default HomePage
