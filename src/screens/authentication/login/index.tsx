import React, { useState } from "react";
import { post } from "../../../api/post";
import "./styles.css";
import TextInput from "../../../components/input/text-input/TextInput";
import axiosInstance from "../../../utils/axios";
import Button from "../../../components/button/Button";
import CSS from "csstype";
import LoginInformation from "../../../components/login/LoginInformation";
function Login() {
  const [loginData, changeLoginData] = useState({
    name: "",
    password: "",
  });
  return (
    <div className="login-container">
      <div className="logo-side">
        <div className="logo-description">
          <h1 className="logo-name"> Auto-Registry</h1>
          <blockquote className="quote">
            There is no secret to success.It is the result of preparation, hard
            work and learning from failure
          </blockquote>
        </div>
        <img
          className="logo"
          src="src\assets\icons\My project 1.png"
          alt="logo"
        />
      </div>
      <LoginInformation />
    </div>
  );
}
export default Login;
