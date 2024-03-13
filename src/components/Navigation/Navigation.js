import React from "react";
import "./Navigation.css";
import { Link, useNavigate } from "react-router-dom";
import PostService from "../../services/post.service";

const Navigation = ({ currentUser, setCurrentUser, moreMenu, setMoreMenu }) => {
  const navigate = useNavigate();
  let handleBack = () => {
    setMoreMenu(false);
  };

  let handleEdit = () => {
    setMoreMenu(!moreMenu);
    navigate("/edit-post");
  };
  let viewPost = PostService.getCurrentViewPost();
  let handleDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirm) {
      PostService.delete(viewPost._id)
        .then((data) => {
          window.alert("post has been delete successfully!");
          setMoreMenu(!moreMenu);
          window.location.reload();
          // console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setMoreMenu(!moreMenu);
    }
  };

  return (
    <>
      {moreMenu && (
        <div className="morePhone">
          <div className="darkBg" onClick={handleBack}></div>
          <div className="moreInfor">
            <div className="moreFunction" onClick={handleDelete}>
              <p className="delete">delete</p>
              <img id="deleteIcon" src="/icons/Delete icon.png" alt="" />
            </div>
            <hr />
            <div className="moreFunction" onClick={handleEdit}>
              <p>edit</p>
              <img src="/icons/Edit icon.png" alt="" />
            </div>
            <hr />
          </div>
        </div>
      )}
      {currentUser && (
        <div className="Nav">
          <div className="buttons">
            <Link className="nav-icon home-icon" to="/">
              <img src="/icons/Home-button.png" alt="" />
            </Link>
            <Link className="nav-icon" to="/search">
              <img src="/icons/Search-results.png" alt="" />
            </Link>
            <Link className="nav-icon" to="/create-post">
              <img src="/icons/Plus-icon.png" alt="" />
            </Link>
            <Link className="nav-icon" to="">
              <img src="/icons/Setting-icon.png" alt="" />
            </Link>
            <Link className="nav-icon profile-icon" to="/profile">
              <img src="/icons/Profile-icon.png" alt="" />
            </Link>
          </div>
        </div>
      )}
      {!currentUser && (
        <div className="Nav-unregister">
          <div className="buttons">
            <Link className="nav-icon home-icon" to="/">
              <img src="/icons/Home-button.png" alt="" />
            </Link>
            <Link className="nav-icon" to="/search">
              <img src="/icons/Search-results.png" alt="" />
            </Link>
            <Link className="nav-icon profile-icon" to="">
              <img src="/icons/Setting-icon.png" alt="" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
