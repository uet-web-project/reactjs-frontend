import React, { useState } from "react";
import { post } from "../../../api/post";
import "./styles.css";
import TextInput from "../../../components/input/text-input/TextInput";
import axiosInstance from "../../../utils/axios";
import Button from "../../../components/button/Button";
import CSS from "csstype";
function Login() {
  const [loginData, changeLoginData] = useState({
    name: "",
    password: "",
  });

  function onLoginChange(event: any, fieldName: string) {
    changeLoginData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  }
  let signInButtonStyle: CSS.Properties = {
    width: "20vw",
    height: "36px",
    marginTop: "20px",
    boxSizing: "border-box",
  };
  let inputStyle: CSS.Properties = {
    width: "20vw",
    height: "36px",
    boxSizing: "border-box",
    marginBottom: "10px",
    border: "none",
    padding: "10px",
    backgroundColor: "white",
  };

  async function login() {
    const res = await axiosInstance.post(
      post().registrationDepLogin,
      loginData
    );
    console.log(res);
    
  }
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
      <div className="login-section">
        <div className="login-header">
          <h1 className="welcome-back">Welcome back</h1>
          <p>Welcome back! Please enter your details.</p>
          <h1 className="login">Login</h1>
        </div>
        <div className="login-input">
          <TextInput
            value={loginData.name}
            fieldName="Account"
            style={inputStyle}
            type="text"
            onChange={(event) => {
              onLoginChange(event, "name");
            }}
          />
          <TextInput
            value={loginData.password}
            fieldName="Password"
            style={inputStyle}
            type="password"
            onChange={(event) => {
              onLoginChange(event, "password");
            }}
          />
          <Button onClick = {login} content="Sign in" style={signInButtonStyle} />
        </div>
      </div>
    </div>
  );
}
export default Login;
