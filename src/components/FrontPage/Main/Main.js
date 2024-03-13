import React from "react";
import "./Main.css";
import Post from "../Posts/Post";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";

const Main = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    window.alert(
      "logout successfully. You will now be directed to the front page"
    );
    setCurrentUser(null);
  };

  return (
    <div className="mainInfor">
      <Link to="/">
        <h2 className="logo">Connect</h2>
      </Link>
      <div className="loginSignup">
        {!currentUser && (
          <Link to="/login" className="btnLink login">
            login
          </Link>
        )}
        {!currentUser && (
          <Link to="/register" className="btnLink">
            signup
          </Link>
        )}
        {currentUser && (
          <Link onClick={handleLogout} to="/" className="btnLink logout">
            logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Main;
