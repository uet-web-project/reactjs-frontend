import React, { useState } from "react";
import { postAPI } from "../../api/postAPI";
import { getAPI } from "../../api/getAPI";
import CSS from "csstype";
import Button from "../button/Button";
import axiosInstance from "../../utils/axios";
import TextInput from "../input/text-input/TextInput";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { accountHook } from "../../redux/hooks/accountHooks";

function SignUpInformation() {
  const navigate = useNavigate();
  const { createRegistrationCenter } = accountHook();
  const [signUpData, changeSignUpData] = useState({
    centerId: "",
    password: "",
    name: "",
    location: "",
    phoneNumber: "",
  });
  const [errorData, setError] = useState({
    centerIdError: "",
    passwordError: "",
    repasswordError: "",
    centerNameError: "",
    centerLocationError: "",
    phoneNumberError: "",
  });

  const [correctIcon, setIconState] = useState({
    centerIdState: false,
    passwordState: false,
    repasswordState: false,
    centerNameState: false,
    centerLocationState: false,
    phoneNumberState: false,
  });

  function showIcon(fieldName: string, value: boolean) {
    setIconState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }
  function showError(fieldName: string, value: string) {
    setError((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }
  const [repassword, changeRePassword] = useState("");

  function onSignUpChange(event: any, fieldName: string) {
    changeSignUpData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
    switch (fieldName) {
      case "centerId": {
        showError("centerIdError", "");
        showIcon("centerIdState", false);
        break;
      }
      case "password": {
        showError("passwordError", "");
        showIcon("passwordState", false);
        break;
      }
      case "name": {
        showError("centerNameError", "");
        showIcon("centerNameState", false);
        break;
      }
      case "location": {
        showError("centerLocationError", "");
        showIcon("centerLocationState", false);
        break;
      }
      case "phoneNumber": {
        showError("phoneNumberError", "");
        showIcon("phoneNumberState", false);
        break;
      }
      default: {
        break;
      }
    }
  }

  let inputStyle: CSS.Properties = {
    color: "grey",
    width: "65%",
    maxWidth: "450px",
  };

  let signInButtonStyle: CSS.Properties = {
    height: "36px",
    marginTop: "15px",
    maxWidth: "450px",
    width: "65%",
  };

  async function signUp() {
    createRegistrationCenter(signUpData, repassword, showError, showIcon);
  }

  async function getAllDeps() {
    const res = await axiosInstance.get(getAPI().getAllDeps);
    console.log(res);
  }

  return (
    <div className="signUp-container">
      <div className="side-image">
        <img
          src="src\assets\images\create-accountImg.png"
          alt="create account image"
        />
      </div>
      <div className="signUp-section">
        <div className="signUp-input">
          <div className="signUp-header">
            <h3 style={{ marginBottom: "0px" }} className="secondary-font">
              Create account
            </h3>
            <span
              className="secondary-font "
              style={{
                fontWeight: 600,
                fontSize: "14px",
                color: "grey",
              }}
            >
              {" "}
              Create new account for registry center !
            </span>
          </div>
          <div className="input-information">
            <TextInput
              value={signUpData.centerId}
              fieldName="CenterId"
              style={inputStyle}
              type="text"
              onChange={(event) => {
                onSignUpChange(event, "centerId");
              }}
              error={errorData.centerIdError}
              showIcon={correctIcon.centerIdState}
            />
            <TextInput
              value={signUpData.password}
              fieldName="Password"
              style={inputStyle}
              type="password"
              onChange={(event) => {
                onSignUpChange(event, "password");
              }}
              error={errorData.passwordError}
              showIcon={correctIcon.passwordState}
            />
            <TextInput
              value={repassword}
              fieldName="Repassword"
              style={inputStyle}
              type="password"
              onChange={(event) => {
                let value = event.target.value;
                showError("repasswordError", "");
                showIcon("repasswordState", false);
                changeRePassword(value);
              }}
              error={errorData.repasswordError}
              showIcon={correctIcon.repasswordState}
            />
            <TextInput
              value={signUpData.name}
              fieldName="Name"
              style={inputStyle}
              type="text"
              onChange={(event) => {
                onSignUpChange(event, "name");
              }}
              error={errorData.centerNameError}
              showIcon={correctIcon.centerNameState}
            />
            <TextInput
              value={signUpData.location}
              fieldName="Location"
              style={inputStyle}
              type="text"
              onChange={(event) => {
                onSignUpChange(event, "location");
              }}
              error={errorData.centerLocationError}
              showIcon={correctIcon.centerLocationState}
            />
            <TextInput
              value={signUpData.phoneNumber}
              fieldName="Phone Number"
              style={inputStyle}
              type="text"
              onChange={(event) => {
                onSignUpChange(event, "phoneNumber");
              }}
              error={errorData.phoneNumberError}
              showIcon={correctIcon.phoneNumberState}
            />
          </div>
          <Button
            onClick={signUp}
            content="Create account"
            style={signInButtonStyle}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpInformation;
