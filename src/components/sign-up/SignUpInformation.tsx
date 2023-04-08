import React, { useState } from "react";
import { post } from "../../api/post";
import CSS from "csstype";
import Button from "../button/Button";
import axiosInstance from "../../utils/axios";
import TextInput from "../input/text-input/TextInput";
import "./styles.css";

function SignUpInformation() {
  const [signUpData, changeSignUpData] = useState({
    centerId: "",
    password: "",
    location: "",
  });
  const [repassword, changeRePassword] = useState("")
  function onSignUpChange(event: any, fieldName: string) {
    changeSignUpData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  }

//   let inputStyle: CSS.Properties = {
//     width: "20vw",
//     height: "36px",
//     boxSizing: "border-box",
//     marginBottom: "10px",
//     border: "none",
//     padding: "10px",
//     backgroundColor: "white",
//   };

//   let signInButtonStyle: CSS.Properties = {
//     width: "20vw",
//     height: "36px",
//     marginTop: "20px",
//     boxSizing: "border-box",
//   };

  async function login() {
    const res = await axiosInstance.post(
      post().createRegistrationCenter,
      signUpData
    );
    console.log(res);
  }
  return (
    <div className="signUp-section">
      <div className="signUp-header">
        <h1>Create account</h1>
      </div>
      <div className="signUp-input">
        <TextInput
          value={signUpData.centerId}
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

export default SignUpInformation;
