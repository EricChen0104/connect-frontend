import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";

const CreatePost = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  let handleBack = () => {
    navigate("/");
  };
  let handleBackToLogin = () => {
    navigate("/login");
  };
  let handleTitle = (e) => {
    setTitle(e.target.value);
  };
  let handleDetail = (e) => {
    setDetail(e.target.value);
  };
  let handleSubmit = () => {
    PostService.post(title, detail)
      .then((data) => {
        window.alert("new post has been saved successfully!");
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
          <p>please login before you write post</p>
          <button onClick={handleBackToLogin}>Login</button>
        </div>
      )}
      {currentUser && (
        <div className="create-post">
          <h3 className="create-post-text">Create Post</h3>
          <div className="form-create">
            <div className="buttons-creatPost">
              <button onClick={handleBack} className="back-btn">
                back
              </button>
              <button onClick={handleSubmit} className="submit-btn">
                submit
              </button>
            </div>
            <input
              onChange={handleTitle}
              type="text"
              className="title-create"
              placeholder="Title..."
            />
            <textarea
              name=""
              className="detail-create"
              placeholder="Type something..."
              onChange={handleDetail}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
