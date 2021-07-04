import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import ProfileHeader from '../components/ProfileHeader'
import ProfilePhotos from '../components/ProfilePhotos'
import AuthContext from '../context/AuthContext'

function Profile() {
    const  [posts,setPosts]=useState([])
    const {userData}=useContext(AuthContext)
    async function getPosts(){
    const postRes=await axios.get("http://localhost:5000/post/profile/")
    setPosts(postRes.data)  
    }

    useEffect(()=>{
        getPosts()
    },[posts])
    return (
        <div>
           <ProfileHeader photoCount={posts?.length}/>
           <ProfilePhotos photos={posts} userData={userData}/>
        </div>
    )
}

export default Profile
