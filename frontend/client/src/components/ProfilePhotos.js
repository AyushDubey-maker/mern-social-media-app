import React from "react";
import Skeleton from "react-loading-skeleton";
import './ProfilePhotos.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";

function ProfilePhotos({ photos,userData }) {

    const deletePost=async(id)=>{
        await axios.delete(`http://localhost:5000/post/delete/${id}`)
    }
    const likePost=async(id)=>{
        try{
         const data={
             user_id:userData?._id
         }
         await axios.post(`http://localhost:5000/post/like/${id}`,data)
        }catch(err){
          alert(err)
        }
    }
  return (
    <div className="photo_container">
      <div className="photo_grid">
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : (
          photos.map((photo) => (
            <div key={photo._id} className="photo_div">
              <img src={`/posts/${photo.postImage}`} alt="" />
              <p className="photo_caption">{photo.caption}</p>
              <div className="photo_actions">
                <p>
                 <FavoriteIcon style={{color:photo?.likedBy?.includes(userData?._id)?'red':'gray',cursor:'pointer'}} onClick={()=>{likePost(photo._id)}}/>
                  {photo.likes}
                </p>
                <p>
                  <CommentIcon style={{color:'gray'}}/>
                  {photo.comments.length}
               
                </p>

                <p
                  title="Delete Post"
                  className="flex items-center text-white font-bold cursor-pointer hover:text-red-primary"
                >
                  <DeleteIcon style={{color:'gray',cursor:'pointer'}} onClick={()=>deletePost(photo._id)}/>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {!photos || (photos.length===0 && <h3>No Posts Yet</h3>)}
    </div>
  );
}

export default ProfilePhotos;
