import { Avatar } from '@material-ui/core'
import React from 'react'
import PhotoFooter from './PhotoFooter'
import './HomePostContent.css'
function HomePostContent({username,userPost,profilePic,photo,userData,photoId}) {
    return (
        <div className="photo_header_container">
            <div className="photo_header_div">
                <Avatar src={`/uploads/${profilePic}`} className="photo_header_userImage"/>
                <p>{username}</p>
            </div>
                <img src={`/posts/${userPost}`} alt=""/>
             <PhotoFooter photo={photo}  userData={userData} photoId={photoId}/>
        </div>
    )
}

export default HomePostContent
