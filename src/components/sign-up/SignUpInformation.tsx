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
    name: "Test center",
    location: "",
    phoneNumber: "",
  });
  const [repassword, changeRePassword] = useState("");
  function onSignUpChange(event: any, fieldName: string) {
    changeSignUpData((prev) => ({
      ...prev,
      [fieldName]: event.target.value,
    }));
  }

  function validateRePassword() {
    alert("Repassword is not match");
    return repassword === signUpData.password;
  }

  function validatePassword() {
    let minNumberofChars = 8;
    let regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,1000}$/;
    if (signUpData.password.length < minNumberofChars) {
      alert("password must be more than 8 character");
      return false;
    }
    if (!regularExpression.test(signUpData.password)) {
      alert(
        "password should contain atleast one number and one special character"
      );
      return false;
    }
    return true;
  }

  function validePhoneNumber() {
    let regularExpression =
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (signUpData.phoneNumber.match(regularExpression)) {
      return true;
    } else {
      alert("Wrong phone number format");
      return false;
    }
  }
  let inputStyle: CSS.Properties = {
    width: "40%",
    maxWidth: "720px",
  };

  let signInButtonStyle: CSS.Properties = {
    width: "40%",
    height: "36px",
    marginTop: "30px",
    maxWidth: "720px",
  };

  async function signUp() {
    if (validatePassword() && validateRePassword() && validePhoneNumber()) {
      const res = await axiosInstance.post(post().createRegistrationCenter, {
        ...signUpData,
        registrationDep: "642bf629abc004745c557c56",
      });
      console.log(res);
    }
  }
  return (
    <div className="signUp-section">
      <div className="signUp-header">
        <h1>Create account</h1>
      </div>
      <div className="signUp-input">
        <TextInput
          value={signUpData.centerId}
          fieldName="CenterId"
          style={inputStyle}
          type="text"
          onChange={(event) => {
            onSignUpChange(event, "centerId");
          }}
        />
        <TextInput
          value={signUpData.password}
          fieldName="Password"
          style={inputStyle}
          type="password"
          onChange={(event) => {
            onSignUpChange(event, "password");
          }}
        />
        <TextInput
          value={repassword}
          fieldName="Repassword"
          style={inputStyle}
          type="password"
          onChange={(event) => {
            let value = event.target.value;
            changeRePassword(value);
          }}
        />
        <TextInput
          value={signUpData.name}
          fieldName="Name"
          style={inputStyle}
          type="text"
          onChange={(event) => {
            onSignUpChange(event, "name");
          }}
        />
        <TextInput
          value={signUpData.location}
          fieldName="Location"
          style={inputStyle}
          type="text"
          onChange={(event) => {
            onSignUpChange(event, "location");
          }}
        />
        <TextInput
          value={signUpData.phoneNumber}
          fieldName="Phone Number"
          style={inputStyle}
          type="text"
          onChange={(event) => {
            onSignUpChange(event, "phoneNumber");
          }}
        />
        <Button
          onClick={signUp}
          content="Create account"
          style={signInButtonStyle}
        />
      </div>
    </div>
  );
}

export default SignUpInformation;
