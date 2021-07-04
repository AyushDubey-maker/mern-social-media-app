import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Modal } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 150,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    overflowX: "hidden",
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
function CommentModal({ open, close, photo }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <div>
      {photo?.comments.length > 0 && (
        <Modal open={open} onClose={close}>
          <div style={modalStyle} className={classes.paper}>
            <CancelIcon
              style={{ cursor: "pointer" }}
              onClick={close}
              color="secondary"
            ></CancelIcon>
            <p>View all comments</p>
            <div className="comments_modal_container">
              {photo?.comments.map((comment) => (
                <div className="comments_modal_div">
                  <Avatar src={`/uploads/${comment.commentatorImage}`} />
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CommentModal;
