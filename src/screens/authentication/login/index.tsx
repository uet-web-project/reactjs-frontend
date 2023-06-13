import React, { useState } from "react";
import "./styles.css";
import SignUpInformation from "../../../components/sign-up/SignUpInformation";
import { Outlet } from "react-router-dom";
import logoImage from "../../../assets/icons/MyProject1.png";
function Login() {
  return (
    <div className="login-container">
      <div className="logo-side">
        <div className="logo-description">
          <h1 className="logo-name font-bold text-3xl"> Auto-Registry</h1>
          <blockquote className="quote text-base text-white-700 font-medium">
            There is no secret to success.It is the result of preparation, hard
            work and learning from failure
          </blockquote>
        </div>
        <img className="logo" src={logoImage} alt="logo" />
      </div>
      <Outlet />
    </div>
  );
}
export default Login;
