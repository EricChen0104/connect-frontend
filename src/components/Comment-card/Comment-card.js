import React, { useState } from "react";
import "./Comment-card.css";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";

const CommentCard = ({ currentUser, post }) => {
  console.log(post);
  let [likeNum, setLikesNum] = useState(post.likes);
  let isLike = false;

  if (currentUser) {
    isLike =
      post.likesUser.indexOf(AuthService.getCurrentUser().user._id) !== -1;
    console.log(isLike);
  }
  let [liked, setLiked] = useState(isLike);

  let handleLike = () => {
    if (currentUser) {
      // let userId = AuthService.getCurrentUser().user._id;
      PostService.commentLike(AuthService.getCurrentUser().user._id, post._id)
        .then((data) => {
          setLikesNum(data.data.post.likes);
          console.log(data.data, likeNum);
          if (data.data.msg === "Comment unliked successfully.")
            setLiked(false);
          else setLiked(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      window.alert("You need to login before liking a post.");
    }
  };

  return (
    <div className="comment-post">
      <div className="user-comment">
        <img src="/icons/User.png" alt="" />
        <p>{post.userId.username}</p>
      </div>

      <div className="bottomBar-comment">
        <div className="comment-infor">{post.commentText}</div>
        <div className="post-likes" onClick={handleLike}>
          <button>
            <img
              src={liked ? "/icons/liked.png" : "/icons/Like-icon.png"}
              alt=""
            />
          </button>
          <p>{likeNum}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CommentCard;
