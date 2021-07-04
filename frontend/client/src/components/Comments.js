import { Avatar } from '@material-ui/core'
import './PhotoFooter.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
function Comments({comment,commentUsername,commentImage,commentId,postId}) {
    const {userData}=useContext(AuthContext)
    const deleteComment=async()=>{
        try{
           const comment_data={
               comment_id:commentId
           }
           await axios.put(`http://localhost:5000/post/deletecomment/${postId}`,comment_data)
        }catch(err){
            alert(err.message)
        }
    }
    return (
        <div className="comments_container">
           
            <div className="comments_div">
                <Avatar src={`/uploads/${commentImage}`}/>
                <p>{comment}</p>
        
            </div>
            <div className="dropdown">
             <MoreHorizIcon/>
             {userData?.username===commentUsername && 
             
             <div className="dropdown-content">
              <p onClick={deleteComment}>Delete Comment</p>                                
             </div>
              }
            </div>
        </div>
    )
}

export default Comments
