import React, { useState, useEffect, useRef } from "react";
import "./Post-card.css";
import AuthService from "../../services/auth.service";
import PostService from "../../services/post.service";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

const PostCard = ({
  currentUser,
  post,
  viewProfile,
  setViewProfile,
  setViewPost,
  setLastPostPlace,
  setMoreMenu,
}) => {
  const navigate = useNavigate();
  let [likesNum, setLikesNum] = useState(post.likes);
  let [openMore, setOpenMore] = useState(false);
  // console.log(post);
  // let likeLength = post.likes.length;
  let isLike = false;

  if (currentUser) {
    isLike =
      post.likesUser.indexOf(AuthService.getCurrentUser().user._id) !== -1;
    console.log(isLike);
  }

  let [liked, setLiked] = useState(isLike);
  // if (isLike) {
  //   setLiked("/icons/liked.png");
  // }

  let handleOtherProfile = () => {
    AuthService.getOtherProfile(post.writer._id)
      .then((data) => {
        console.log(data.data);
        // setViewProfile(data.data);
        localStorage.setItem("otherProfile", JSON.stringify(data.data));
        setLastPostPlace("from front page");
        // console.log(viewProfile);
        navigate("/Otherprofile");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let handleLike = () => {
    if (currentUser) {
      // let userId = AuthService.getCurrentUser().user._id;
      PostService.liked(AuthService.getCurrentUser().user._id, post._id)
        .then((data) => {
          setLikesNum(data.data.post.likes);
          console.log(data.data);
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

  let handleView = () => {
    localStorage.setItem("viewPost", JSON.stringify(post));
    navigate("/viewPost");
  };

  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    PostService.getComment(post._id)
      .then((data) => {
        setCommentData(data.data);
        // console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let handleMoreMenu = () => {
    if (currentUser) {
      let screenWidth = window.innerWidth;
      localStorage.setItem("viewPost", JSON.stringify(post));
      if (AuthService.getCurrentUser().user.username == post.writer.username) {
        if (screenWidth > 800) {
          setOpenMore(!openMore);
        } else {
          setMoreMenu(true);
        }
      }
    } else {
      window.alert("please login first");
    }
  };

  const textAreaRef = useRef(null);
  let [readmore, setReadMore] = useState(false);
  const checkOverflow = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      const isOverflowing = textarea.scrollHeight > textarea.clientHeight;
      if (isOverflowing) {
        setReadMore(true);
      }
    }
  };

  useEffect(() => {
    checkOverflow();
  }, []); // Run only on initial render

  let handleEdit = () => {
    navigate("/edit-post");
  };
  let handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirm) {
      PostService.delete(post._id)
        .then((data) => {
          window.alert("post has been delete successfully!");
          setOpenMore(!openMore);
          window.location.reload();
          // console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setOpenMore(!openMore);
    }
  };
  return (
    <div className="post-card">
      <div className="headersBar">
        <div onClick={handleOtherProfile} className="userInforBar">
          <img src="/icons/User.png" alt="" />
          <p>{post.writer.username}</p>
        </div>
        <button className="moreBtn" onClick={handleMoreMenu}>
          <img src="/icons/More.png" alt="" />
        </button>
        {openMore && (
          <div className="moreMenu-phone">
            <div className="moreFunction" onClick={handleDelete}>
              <p className="delete">delete</p>
              <img id="deleteIcon-phone" src="/icons/Delete icon.png" alt="" />
            </div>
            <hr />
            <div className="moreFunction" onClick={handleEdit}>
              <p>edit</p>
              <img id="edit-phone" src="/icons/Edit icon.png" alt="" />
            </div>
            <hr />
          </div>
        )}
      </div>
      {/* <p onClick={handleView} className="post-title">
        {post.title}
      </p> */}
      <TextareaAutosize value={post.title} maxRows={6} className="post-title" />
      {/* <p onClick={handleView} className="post-description">
        {post.description}
      </p> */}
      <TextareaAutosize
        value={post.description}
        className="post-description postcard-post"
        onClick={handleView}
        maxRows={10}
        ref={textAreaRef}
      />
      {readmore ? (
        <p className="readMore" onClick={handleView}>
          read more
        </p>
      ) : (
        <p></p>
      )}
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
        <div onClick={handleView} className="post-comments">
          <button>
            <img src="/icons/Comment-icon.png" alt="" />
          </button>
          <p>{commentData.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
