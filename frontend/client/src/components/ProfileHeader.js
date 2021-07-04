import { Avatar, Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import ImageUpload from "../modal/ImageUpload";
import "./ProfileHeader.css";
function ProfileHeader({photoCount}) {
  const { userData } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="profile_header">
      <div className="profile_user_image">
        {userData.username ? (
          <img
            className="profileImage"
            src={`/uploads/${userData?.profilePic}`}
            alt=""
          />
        ) : (
          <Avatar />
        )}
      </div>
      <div className="profile_user_details">
        <div className="profile_username">
          <p>{userData?.username}</p>
        </div>

        <div className="profile_contents">
          <>
            <p>{userData?.fullname}</p>
            <p>
              <span style={{ fontWeight: "bold" }}>{photoCount}</span> photos
            </p>
          </>
        </div>

        <div className="profile_image_upload">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add Post
          </Button>
          <ImageUpload open={open} close={handleClose} />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
