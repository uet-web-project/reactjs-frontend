import React, { useState } from "react";
import { post } from "../../api/post";
import CSS from "csstype";
import Button from "../button/Button";
import axiosInstance from "../../utils/axios";
import TextInput from "../input/text-input/TextInput";
import "./styles.css";

function LoginInformation() {
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

  let inputStyle: CSS.Properties = {
    width: "40%",
    maxWidth: "720px",
  };

  let signInButtonStyle: CSS.Properties = {
    fontWeight: 400,
    width: "40%",
    height: "36px",
    marginTop: "30px",
    maxWidth: "720px",
  };

  async function login() {
    const res = await axiosInstance.post(
      post().registrationDepLogin,
      loginData
    );
    console.log(res);
  }

  return (
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
        <Button onClick={login} content="Sign in" style={signInButtonStyle} />
      </div>
    </div>
  );
}

export default LoginInformation;
