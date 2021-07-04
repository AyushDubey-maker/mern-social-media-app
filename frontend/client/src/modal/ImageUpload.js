import React, { useContext, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import {  Input, Modal } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel'
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display:'flex',
      flexDirection:'column'
    },
  }));
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    
  
    };
  }
function ImageUpload({open,close}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [image, setImage] = useState(null);
  const {userData}=useContext(AuthContext)
  
  const [caption, setCaption] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload=async(e)=>{
     e.preventDefault()
     try{
       const image_data=new FormData()
       image_data.append("caption",caption)
       image_data.append("author",userData?.username)
       image_data.append("userImage",userData?.profilePic)
       image_data.append("postImage",image)
       image_data.append("date",new Date())
       image_data.append("uid",userData?._id)
       await axios.post("http://localhost:5000/post/",image_data).then(()=>alert('Post Uploaded'))
       setCaption('')
       setImage('')
     }catch(err){
       alert(err)
     }
      
  }
    return (
        <div>
      <Modal open={open}  onClose={close}>
        <div style={modalStyle} className={classes.paper}>
          {/* <progress value={progress} max="100" /> */}
          <CancelIcon style={{cursor:'pointer'}} onClick={close} color="secondary"></CancelIcon>
        
         <form onSubmit={handleUpload} encType="multipart/form-data" >
          <Input
            type="text"
            className="mt-2"
            value={caption}
            required
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter a caption"
          />
          <Input className="mt-2" required filename="postImage" type="file" onChange={handleChange} />
         
          <button
            disabled={!caption}
           className="image_upload_button"
          >
            Upload
          </button>
          </form>
        </div>
      </Modal>
    </div>
    )
}

export default ImageUpload
