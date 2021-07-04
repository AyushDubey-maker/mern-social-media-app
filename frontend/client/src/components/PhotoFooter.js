import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import "./PhotoFooter.css";
import AddComment from "./AddComment";
import Comments from "./Comments";
import axios from "axios";
import CommentModal from "../modal/CommentModal";
function PhotoFooter({ photo, userData, photoId }) {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  const likePost = async () => {
    try {
      const data = {
        user_id: userData?._id,
      };
      await axios.post(`http://localhost:5000/post/like/${photoId}`, data);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="photo_footer_container">
      <p style={{ paddingLeft: "5px" }}>
        <strong>{photo.author}</strong> {photo.caption}
      </p>
      <div className="photo_footer">
        <p>
          <FavoriteIcon
            style={{
              color: photo?.likedBy?.includes(userData?._id) ? "red" : "gray",
              cursor: "pointer",
            }}
            onClick={likePost}
          />
          {photo?.likes}
        </p>
        <p>
          <CommentIcon
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() => setOpen(true)}
          />
          {photo?.comments.length}
          
          <CommentModal open={open} close={handleClose} photo={photo} />
        </p>
      </div>
      <div>
        <AddComment id={photoId} />
      </div>
      {photo.comments.length > 0 && (
        <div>
          <p className="comment_p">View Comments</p>
          {photo?.comments.slice(0, 3).map((comment) => (
            <Comments
              commentUsername={comment.commentator}
              commentId={comment._id}
              postId={photo?._id}
              comment={comment.comment}
              commentUserName={comment.commentator}
              commentImage={comment.commentatorImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoFooter;
