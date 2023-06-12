import React, { useState } from "react";
import { postAPI } from "../../api/postAPI";
import CSS from "csstype";
import Button from "../button/Button";
import axiosInstance from "../../utils/axios";
import TextInput from "../input/text-input/TextInput";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { accountHook } from "../../redux/hooks/accountHooks";
import axios from "axios";

const idError = "Department does not exist";
const passwordError = "Wrong password";

function LoginInformation({ isDepLogin }: { isDepLogin: boolean }) {
  const { depLogin, centerLogin } = accountHook();
  const navigate = useNavigate();
  const [depLoginData, changeDepLoginData] = useState({
    depId: "",
    password: "",
  });
  const [centerLoginData, changeCenterLoginData] = useState({
    centerId: "",
    password: "",
  });
  const [errorData, changeErrorData] = useState({
    IdError: "",
    passwordError: "",
  });

  function showError(fieldName: string, value: string) {
    changeErrorData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }
  function onLoginChange(event: any, fieldName: string) {
    if (fieldName == "depId" || fieldName == "centerId")
      showError("IdError", "");
    else {
      showError("passwordError", "");
    }

    if (isDepLogin) {
      changeDepLoginData((prev) => ({
        ...prev,
        [fieldName]: event.target.value,
      }));
    } else {
      changeCenterLoginData((prev) => ({
        ...prev,
        [fieldName]: event.target.value,
      }));
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      login();
    }
  };

  async function login() {
    {
      isDepLogin
        ? depLogin({ loginData: depLoginData, showError: showError })
        : centerLogin({ loginData: centerLoginData, showError: showError });
    }
  }

  let inputStyle: CSS.Properties = {
    width: "40%",
    maxWidth: "720px",
  };

  let signInButtonStyle: CSS.Properties = {
    fontWeight: 500,
    width: "40%",
    height: "36px",
    marginTop: "30px",
    maxWidth: "720px",
  };

  return (
    <div className="login-section" onKeyDown={handleKeyDown}>
      <div className="login-header">
        <div className="responsive-bg"></div>
        <h1 className="welcome-back text-3xl">Welcome back</h1>
        <p style={{fontWeight:"900", fontSize:"16px"}}>Please enter your details.</p>
        <h1 className="login">{`${
          isDepLogin ? "Department " : "Center "
        }login`}</h1>
      </div>
      <div className="login-input">
        <TextInput
          value={isDepLogin ? depLoginData.depId : centerLoginData.centerId}
          fieldName={`${isDepLogin ? "Department" : "Center"} ID`}
          style={inputStyle}
          type="text"
          onChange={(event) => {
            onLoginChange(event, isDepLogin ? "depId" : "centerId");
          }}
          error={errorData.IdError}
        />
        <TextInput
          value={isDepLogin ? depLoginData.password : centerLoginData.password}
          fieldName="Password"
          style={inputStyle}
          type="password"
          onChange={(event) => {
            onLoginChange(event, "password");
          }}
          error={errorData.passwordError}
        />
        <div className="error-field"></div>
        <Button
          className="custom-signin-btn"
          onClick={login}
          content="Sign in"
          style={signInButtonStyle}
        />
      </div>
      {
        <Link
          className="secondary-font linkto text-base text-gray-700 font-medium"
          to={`/auth/${isDepLogin ? "center-login" : "department-login"}`}
        >{`Log in as ${isDepLogin ? "center" : "department"}`}</Link>
      }
    </div>
  );
}

export default LoginInformation;
function centerLogin(arg0: {
  loginData: { depId: string; password: string };
  showError: (fieldName: string, value: string) => void;
}) {
  throw new Error("Function not implemented.");
}
