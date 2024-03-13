import React, { useState, useEffect } from "react";
import "./Profile.css";
import PostService from "../../services/post.service";
import PostCard from "../Post-card/Post-card";
import { useNavigate } from "react-router-dom";

const Profile = ({
  currentUser,
  setCurrentUser,
  setViewPost,
  moreMenu,
  setMoreMenu,
}) => {
  console.log(currentUser);
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    let _id = currentUser.user._id;
    console.log(_id);
    PostService.get(_id)
      .then((data) => {
        setPostData(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  let handleEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="mainbg-2">
      {!currentUser && <div>I must login before you get the user profile.</div>}
      {currentUser && (
        <div className="userInfor">
          <div className="nameAndImg">
            <h2>{currentUser.user.username}</h2>
            <img src="/icons/User.png" alt="" />
          </div>
          <div className="bio">{currentUser.user.bio}</div>
          <div className="profile-buttons">
            <button onClick={handleEdit}>Edit Profile</button>
            <button>Share Profile</button>
          </div>
          <hr className="splitLine" />
          {currentUser && postData && postData.length != 0 && (
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
                      moreMenu={moreMenu}
                      setMoreMenu={setMoreMenu}
                    />
                  );
                })}
              <div className="post-end-space"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
