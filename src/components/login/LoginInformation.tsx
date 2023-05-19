import React, { useState } from "react";
import { postAPI } from "../../api/postAPI";
import CSS from "csstype";
import Button from "../button/Button";
import axiosInstance from "../../utils/axios";
import TextInput from "../input/text-input/TextInput";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const idError = "Department does not exist";
const passwordError = "Wrong password";
function LoginInformation() {
  const navigagte = useNavigate();
  const [loginData, changeLoginData] = useState({
    depId: "",
    password: "",
  });
  const [errorData, changeErrorData] = useState({
    depIdError: "",
    passwordError: "",
  });

  function showError(fieldName: string, value: string) {
    changeErrorData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }
  function onLoginChange(event: any, fieldName: string) {
    if (event.target.value === "") {
      if (fieldName == "depId") showError("depIdError", "");
      else {
        showError("passwordError", "");
      }
    }
    changeLoginData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  }

  async function login() {
    try {
      const res = await axiosInstance.post(
        postAPI().registrationDepLogin,
        loginData
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res);
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        navigagte("/landing-page");
      }
    } catch (err: any) {
      if (err.response.data.message === idError) {
        showError("depIdError", idError);
      } else if (err.response.data.message === passwordError) {
        showError("passwordError", passwordError);
      }
    }
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

  return (
    <div className="login-section">
      <div className="login-header">
        <div className="responsive-bg"></div>
        <h1 className="welcome-back">Welcome back</h1>
        <p>Welcome back! Please enter your details.</p>
        <h1 className="login">Login</h1>
      </div>
      <div className="login-input">
        <TextInput
          value={loginData.depId}
          fieldName="Department ID"
          style={inputStyle}
          type="text"
          onChange={(event) => {
            onLoginChange(event, "depId");
          }}
          error={errorData.depIdError}
        />
        <TextInput
          value={loginData.password}
          fieldName="Password"
          style={inputStyle}
          type="password"
          onChange={(event) => {
            onLoginChange(event, "password");
          }}
          error={errorData.passwordError}
        />
        <div className="error-field"></div>
        <Button onClick={login} content="Sign in" style={signInButtonStyle} />
      </div>
    </div>
  );
}

export default LoginInformation;
