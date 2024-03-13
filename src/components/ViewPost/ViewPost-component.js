import React, { useState, useEffect } from "react";
import "./ViewPost.css";
import CommentCard from "../Comment-card/Comment-card";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const ViewPostComponent = ({ currentUser, setLastPostPlace }) => {
  const navigate = useNavigate();
  let viewPost = PostService.getCurrentViewPost();
  console.log(viewPost);
  let [likesNum, setLikesNum] = useState(viewPost.likes);
  let isLike = false;

  if (currentUser) {
    isLike =
      viewPost.likesUser.indexOf(AuthService.getCurrentUser().user._id) !== -1;
    console.log(isLike);
  }
  let [liked, setLiked] = useState(isLike);

  let handleLike = () => {
    if (currentUser) {
      // let userId = AuthService.getCurrentUser().user._id;
      PostService.liked(AuthService.getCurrentUser().user._id, viewPost._id)
        .then((data) => {
          console.log(data.data);
          setLikesNum(data.data.post.likes);

          if (data.data.msg === "Post unliked successfully.") setLiked(false);
          else setLiked(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      window.alert("You need to login before liking a post.");
    }
  };

  const [commentData, setCommentData] = useState([]);
  const [commentText, setCommentText] = useState(null);
  console.log(viewPost._id);
  useEffect(() => {
    PostService.getComment(viewPost._id)
      .then((data) => {
        setCommentData(data.data);
        // console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let handleComment = (e) => {
    setCommentText(e.target.value);
  };
  let handleSubmit = () => {
    PostService.writeComment(viewPost._id, commentText)
      .then((data) => {
        PostService.getComment(viewPost._id)
          .then((data) => {
            setCommentData(data.data);
            // console.log(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
    setCommentText("");
  };

  let handleBack = () => {
    navigate("/");
  };

  let handleOtherProfile = () => {
    AuthService.getOtherProfile(viewPost.writer._id)
      .then((data) => {
        console.log(data.data);
        localStorage.setItem("otherProfile", JSON.stringify(data.data));
        setLastPostPlace("from viewPage");
        // console.log(viewProfile);
        navigate("/Otherprofile");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="mainbg">
      <div className="viewPost-page">
        <button className="back-btn-viewpost" onClick={handleBack}>
          <img src="/icons/Back icon.png" alt="" />
        </button>
        <div className="post-card">
          <div className="headersBar">
            <div onClick={handleOtherProfile} className="userInforBar">
              <img src="/icons/User.png" alt="" />
              <p>{viewPost.writer.username}</p>
            </div>
          </div>
          <TextareaAutosize value={viewPost.title} className="post-title" />
          {/* <p className="post-title">{viewPost.title}</p> */}
          <TextareaAutosize
            value={viewPost.description}
            className="post-description"
          />
          {/* <p className="post-description">{viewPost.description}</p> */}
          <div className="bottomBar">
            <div onClick={handleLike} className="post-likes">
              <button>
                <img
                  src={liked ? "/icons/liked.png" : "/icons/Like-icon.png"}
                  alt=""
                />
              </button>
              <p>{likesNum}</p>
            </div>
            <div className="post-comments">
              <button>
                <img src="/icons/Comment-icon.png" alt="" />
              </button>
              <p>{commentData.length}</p>
            </div>
          </div>
        </div>
        <p className="Comments-text">Comments</p>
        <div className="comments-collect">
          {currentUser && (
            <div className="add-comment">
              <textarea
                onChange={handleComment}
                placeholder="write something..."
                value={commentText}
              ></textarea>
              <button onClick={handleSubmit}>submit</button>
            </div>
          )}
          {commentData && commentData.length != 0 && (
            <div>
              {commentData
                .slice(0)
                .reverse()
                .map((post) => {
                  return (
                    <div>
                      <CommentCard currentUser={currentUser} post={post} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className="post-end-space"></div>
      </div>
    </div>
  );
};

export default ViewPostComponent;
