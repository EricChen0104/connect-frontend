import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import AuthService from "../../services/auth.service";

const EditProfile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [bio, setBio] = useState();
  let [username, setUsername] = useState();

  let handleBack = () => {
    navigate("/profile");
  };
  let handleBackToLogin = () => {
    navigate("/login");
  };

  let handleBio = (e) => {
    setBio(e.target.value);
  };
  let handleUsername = (e) => {
    setUsername(e.target.value);
  };

  let handleSubmit = () => {
    AuthService.editProfile(
      currentUser.user._id,
      username,
      bio,
      currentUser.token
    )
      .then((data) => {
        window.alert("profile has been saved successfully!");
        console.log(data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        setCurrentUser(AuthService.getCurrentUser());
        navigate("/profile");
        // console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //   console.log(currentUser.user.username);
  return (
    <div className="mainbg-2" style={{ overflow: "none" }}>
      {!currentUser && (
        <div>
          <p>please login before you write post</p>
          <button onClick={handleBackToLogin}>Login</button>
        </div>
      )}
      {currentUser && (
        <div className="create-post">
          <h3 className="create-post-text">Edit Profile</h3>
          <div className="form-create">
            <div className="buttons-creatPost">
              <button onClick={handleBack} className="back-btn">
                back
              </button>
              <button onClick={handleSubmit} className="submit-btn">
                submit
              </button>
            </div>
            <img src="/icons/User.png" alt="" className="userimg" />
            <input
              type="text"
              className="title-create"
              placeholder="Name..."
              value={currentUser.user.username}
              onChange={handleUsername}
            />
            <textarea
              name=""
              className="detail-create"
              placeholder="Bio..."
              defaultValue={currentUser.user.bio}
              onChange={handleBio}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
