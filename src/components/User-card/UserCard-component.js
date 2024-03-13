import React, { useState, useEffect } from "react";
import "./UserCard.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const UserCardComponent = ({ currentUser, user, setLastPostPlace }) => {
  console.log(user);
  const [userProfile, setUserProfile] = useState({ user });
  const navigate = useNavigate();
  let handleBtn = () => {
    localStorage.setItem("otherProfile", JSON.stringify(userProfile));
    setLastPostPlace("from search page");
    navigate("/OtherProfile");
    console.log({ user });
  };
  const [btnText, setBtnText] = useState("Follow");
  let isFollow = false;
  const [follow, setFollow] = useState(isFollow);

  let checkUser = () => {
    if (currentUser) {
      if (AuthService.getCurrentUser().user._id == user._id)
        setBtnText("Edit Profile");
      // console.log("test");
      else {
        isFollow =
          user.fansUser.indexOf(AuthService.getCurrentUser().user._id) !== -1;
        console.log(isFollow);
        setFollow(isFollow);
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  let handleFollow = () => {
    if (currentUser) {
      if (btnText == "Follow") {
        AuthService.follow(AuthService.getCurrentUser().user._id, user._id)
          .then((data) => {
            console.log(data.data.post);
            // setUserProfile(data.data.post);
            // console.log(userProfile);
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
    <>
      <div className="user-card">
        <div className="userImgPart" onClick={handleBtn}>
          <div className="userImg-usercard">
            <img src="./icons/User.png" alt="" />
          </div>
          <div>{user.username}</div>
        </div>
        <div>
          {follow ? (
            <button id="isFollow" onClick={handleFollow} className="followBtn">
              Following
            </button>
          ) : (
            <button onClick={handleFollow} className="followBtn">
              {btnText}
            </button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default UserCardComponent;
