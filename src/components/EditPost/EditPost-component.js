import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./EditPost.css";
import AuthService from "../../services/auth.service";
import PostService from "../../services/post.service";

const EditPost = ({ currentUser }) => {
  const navigate = useNavigate();
  let viewPost = PostService.getCurrentViewPost();
  const [title, setTitle] = useState(viewPost.title);
  const [description, setDescription] = useState(viewPost.description);
  let handleBack = () => {
    navigate("/");
  };
  let handleBackToLogin = () => {
    navigate("/login");
  };
  console.log(viewPost);

  let handleTitle = (e) => {
    setTitle(e.target.value);
  };
  let handleDescription = (e) => {
    setDescription(e.target.value);
  };

  let handleSave = () => {
    PostService.edit(title, description, viewPost._id)
      .then((data) => {
        window.alert("post has been saved successfully!");
        navigate("/");
        // console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="mainbg-2" style={{ overflow: "none" }}>
      {!currentUser && (
        <div>
          <p>please login before you edit post</p>
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
              <button className="submit-btn" onClick={handleSave}>
                save
              </button>
            </div>
            <input
              type="text"
              className="title-create"
              placeholder="Title..."
              defaultValue={viewPost.title}
              onChange={handleTitle}
            />
            <textarea
              name=""
              className="detail-create"
              placeholder="write something..."
              defaultValue={viewPost.description}
              onChange={handleDescription}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
