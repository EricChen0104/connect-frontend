import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

const Login = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [message, setMessage] = useState("");
  let [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert(
        "login successfully. You will now be directed to the profile page"
      );
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div className="mainbg-2">
      <div className="loginForm">
        <h3>Login</h3>
        {message && <div className="errorMsg">{message}</div>}
        <div className="form">
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleEmail}
            type="email"
            placeholder="Email"
            name="email"
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={handlePassword}
            type="text"
            placeholder="Password"
            name="password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
      <div className="space"></div>
    </div>
  );
};

export default Login;
