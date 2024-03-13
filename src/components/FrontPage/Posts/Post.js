import React, { useState, useEffect } from "react";
import "./Post.css";
import PostService from "../../../services/post.service";
import PostCard from "../../Post-card/Post-card";
import { useNavigate } from "react-router-dom";

const Post = ({
  currentUser,
  setCurrentUser,
  viewProfile,
  setViewProfile,
  viewPost,
  setViewPost,
  setLastPostPlace,
  moreMenu,
  setMoreMenu,
  reloadPost,
}) => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  useEffect(() => {
    PostService.getAll()
      .then((data) => {
        setPostData(data.data);
        // console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [reloadPost]);

  let handleAddBtn = () => {
    navigate("/create-post");
  };

  return (
    <>
      <div className="write-post"></div>
      <div className="mainbg-2">
        {currentUser && (
          <div className="postBtn">
            <h3>Posts</h3>
            <button onClick={handleAddBtn}>add</button>
          </div>
        )}
        <div className="all-posts">
          {postData && postData.length != 0 && (
            <div>
              {postData
                .slice(0)
                .reverse()
                .map((post) => {
                  return (
                    <div className="frontPage-posts-1">
                      <PostCard
                        currentUser={currentUser}
                        post={post}
                        viewProfile={viewProfile}
                        setViewProfile={setViewProfile}
                        setViewPost={setViewPost}
                        setLastPostPlace={setLastPostPlace}
                        moreMenu={moreMenu}
                        setMoreMenu={setMoreMenu}
                      />
                    </div>
                  );
                })}
              <div className="post-end-space"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
