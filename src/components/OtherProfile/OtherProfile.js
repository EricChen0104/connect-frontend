import React, { useState, useEffect } from "react";
import "../Profile/Profile.css";
import "../OtherProfile/OtherProfile.css";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import PostCard from "../Post-card/Post-card";
import { useNavigate } from "react-router-dom";

const OtherProfile = ({ lastPostPlace, setViewPost, currentUser }) => {
  let viewProfile = PostService.getWriterProfile();
  console.log(viewProfile);
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [btnText, setBtnText] = useState("Follow");
  let isFollow = false;
  const [follow, setFollow] = useState(isFollow);

  let checkUser = () => {
    if (currentUser) {
      if (AuthService.getCurrentUser().user._id == viewProfile.user._id)
        setBtnText("Edit Profile");
      // console.log("test");
      else {
        isFollow =
          viewProfile.user.fansUser.indexOf(
            AuthService.getCurrentUser().user._id
          ) !== -1;
        console.log(isFollow);
        setFollow(isFollow);
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  useEffect(() => {
    let _id = viewProfile.user._id;
    console.log(_id);
    PostService.getOtherProfilePost(_id)
      .then((data) => {
        setPostData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let handleBack = () => {
    if (lastPostPlace == "from front page") {
      navigate("/");
    } else if (lastPostPlace == "from search page") {
      navigate("/search");
    } else {
      navigate("/viewPost");
    }
  };

  let handleFollow = () => {
    if (currentUser) {
      if (btnText == "Follow") {
        AuthService.follow(
          AuthService.getCurrentUser().user._id,
          viewProfile.user._id
        )
          .then((data) => {
            console.log(data.data);
            if (data.data.msg === "User cancel followed successfully.")
              setFollow(false);
            else setFollow(true);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        navigate("/edit-profile");
      }
    } else {
      window.alert("please login first!");
    }
  };

  return (
    <div className="mainbg-2">
      <div className="userInfor">
        <button className="back-btn-viewpost" onClick={handleBack}>
          <img src="/icons/Back icon.png" alt="" />
        </button>
        <div className="nameAndImg">
          <h2>{viewProfile.user.username}</h2>
          <img src="/icons/User.png" alt="" />
        </div>
        <div className="bio">{viewProfile.user.bio}</div>
        <div className="profile-buttons">
          {/* <button>Follow</button> */}
          {follow ? (
            <button id="isFollow" onClick={handleFollow}>
              Following
            </button>
          ) : (
            <button onClick={handleFollow}>{btnText}</button>
          )}
          <button>Send message</button>
        </div>
        <hr className="splitLine" />
        {postData && postData.length != 0 && (
          <div className="frontPage-posts">
            {postData
              .slice(0)
              .reverse()
              .map((post) => {
                return (
                  <PostCard
                    currentUser={currentUser}
                    post={post}
                    setViewPost={setViewPost}
                  />
                );
              })}
            <div className="post-end-space"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtherProfile;
