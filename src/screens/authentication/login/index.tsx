import React, { useState } from "react";
import "./styles.css";
import SignUpInformation from "../../../components/sign-up/SignUpInformation";
import { Outlet } from "react-router-dom";
function Login() {
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
          src={"/src/assets/icons/Myproject1.png"}
          alt="logo"
        />
      </div>
      <Outlet />
    </div>
  );
}
export default Login;
