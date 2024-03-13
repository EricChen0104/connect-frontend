import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import Post from "./components/FrontPage/Posts/Post";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { useState } from "react";
import AuthService from "./services/auth.service";
import CreatePost from "./components/CreatePost/CreatePost";
import EditProfile from "./components/EditProfile/EditProfile";
import OtherProfile from "./components/OtherProfile/OtherProfile";
import ViewPostComponent from "./components/ViewPost/ViewPost-component";
import SearchComponent from "./components/Search-component/Search-component";
import EditPost from "./components/EditPost/EditPost-component";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [viewProfile, setViewProfile] = useState(null);
  let [viewPost, setViewPost] = useState(null);
  let [lastPostPlace, setLastPostPlace] = useState(null);
  let [moreMenu, setMoreMenu] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              moreMenu={moreMenu}
              setMoreMenu={setMoreMenu}
            />
          }
        >
          <Route
            index
            element={
              <Post
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                viewProfile={viewProfile}
                setViewProfile={setViewProfile}
                setViewPost={setViewPost}
                setLastPostPlace={setLastPostPlace}
                moreMenu={moreMenu}
                setMoreMenu={setMoreMenu}
              />
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                moreMenu={moreMenu}
                setMoreMenu={setMoreMenu}
              />
            }
          ></Route>
          <Route
            path="/create-post"
            element={
              <CreatePost
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/edit-profile"
            element={
              <EditProfile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          ></Route>
          <Route
            path="/Otherprofile"
            element={
              <OtherProfile
                lastPostPlace={lastPostPlace}
                currentUser={currentUser}
              />
            }
          ></Route>
          <Route
            path="/viewPost"
            element={
              <ViewPostComponent
                currentUser={currentUser}
                setLastPostPlace={setLastPostPlace}
              />
            }
          ></Route>
          <Route
            path="/search"
            element={
              <SearchComponent
                currentUser={currentUser}
                setLastPostPlace={setLastPostPlace}
              />
            }
          ></Route>
          <Route
            path="/edit-post"
            element={<EditPost currentUser={currentUser} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
