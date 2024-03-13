import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import AuthService from "../../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password)
      .then(() => {
        window.alert(
          "registration success! You will now be directed to the login page"
        );
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div className="mainbg-2">
      <div className="registerForm">
        <h3>Register</h3>
        {message && <div className="errorMsg">{message}</div>}
        <div className="form">
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleUsername}
            type="text"
            placeholder="Username"
            name="username"
          />
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
          <button onClick={handleRegister}>Create</button>
        </div>
      </div>
      <div className="spaceR"></div>
    </div>
  );
};

export default Register;
