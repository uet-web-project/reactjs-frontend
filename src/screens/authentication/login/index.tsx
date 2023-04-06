import React from "react";
import "./styles.css";
import TextInput from "../../../components/input/text-input/TextInput";
import Button from "../../../components/button/Button";
import CSS from "csstype";
import { display, height } from "@mui/system";
function Login() {
  let signInButtonStyle: CSS.Properties = {
    width: "20vw",
    height: "10vh",
    marginTop: "20px",
    boxSizing: "border-box",
  };
  let inputStyle: CSS.Properties = {
    width: "20vw",
    height: "10vh",
    boxSizing: "border-box",
    marginBottom: "10px",
  };
  return (
    <div className="login-container">
      <div className="login-section">
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Welcome back! Please enter your details.</p>
          <h1>Login</h1>
        </div>
        <div className="login-input">
          <TextInput fieldName="Account" style={inputStyle} />
          <TextInput fieldName="Password" style={inputStyle} />
          <Button content="Sign in" style={signInButtonStyle} />
        </div>
      </div>
    </div>
  );
}
export default Login;
