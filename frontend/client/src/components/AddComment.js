import axios from 'axios'
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import './PhotoFooter.css'
function AddComment({id}) {
    const [comment,setComment]=useState('')
    const {userData}=useContext(AuthContext)
    const postComment=async(e)=>{
        e.preventDefault()
        try{
             const data={
              user_id:userData?._id,
              comment:comment,   
             }
             axios.post(`http://localhost:5000/post/comment/${id}`,data)
             setComment('')
        }catch(err){
            alert(err)
        }
    }
    return (
        <div className="add_comment_div">
            <form onSubmit={postComment}>
                <input required value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Enter Comment"/>
                <button>Post</button>
            </form>
        </div>
    )
}

export default AddComment
