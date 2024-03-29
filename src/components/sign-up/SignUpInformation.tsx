import React, { useState } from "react";
import { postAPI } from "../../api/postAPI";
import { getAPI } from "../../api/getAPI";
import CSS from "csstype";
import Button from "../button/Button";
import axiosInstance from "../../utils/axios";
import TextInput from "../input/text-input/TextInput";
import "./styles.css";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import { accountHook } from "../../redux/hooks/accountHooks";
import DropDownLocation from "../dropDown-location/DropDownLocation";
import CheckIcon from "@mui/icons-material/Check";
import signupImage from "../../assets/images/create-accountImg.png";

function SignUpInformation() {
  const { setProvinceCodeState, setDistrictCodeState } = loadingHook();
  const { createRegistrationCenter } = accountHook();
  const [signUpData, changeSignUpData] = useState({
    centerId: "",
    password: "",
    name: "",
    provinceCode: 0,
    districtCode: 0,
    location: "",
    phoneNumber: "",
  });
  const [errorData, setError] = useState({
    centerIdError: "",
    passwordError: "",
    repasswordError: "",
    centerNameError: "",
    provinceCodeError: "",
    districtCodeError: "",
    centerLocationError: "",
    phoneNumberError: "",
  });

  const [correctIcon, setIconState] = useState({
    centerIdState: false,
    passwordState: false,
    repasswordState: false,
    centerNameState: false,
    provinceCodeState: false,
    districtCodeState: false,
    centerLocationState: false,
    phoneNumberState: false,
  });

  function setProvinceAndDistrict(
    isDistrict: boolean,
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode?: number
  ) {
    changeSignUpData((prev) => ({
      ...prev,
      provinceCode: cityCode,
      districtCode: districtCode && isDistrict ? districtCode : 0,
    }));
    setProvinceCodeState(cityCode);
    setDistrictCodeState(districtCode && isDistrict ? districtCode : 0);
    showError("provinceCodeError", "");
    showError("districtCodeError", "");
  }

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
    color: "black",
    width: "65%",
    maxWidth: "450px",
  };

  let signInButtonStyle: CSS.Properties = {
    height: "36px",
    margin: "15px 0 30px 0",
    maxWidth: "450px",
    width: "65%",
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      signUp();
    }
  };

  async function signUp() {
    createRegistrationCenter(signUpData, repassword, showError, showIcon);
  }

  async function getAllDeps() {
    const res = await axiosInstance.get(getAPI().getAllDeps);
  }

  return (
    <div className="signUp-container">
      <div className="side-image">
        <img src={signupImage} alt="create account image" />
      </div>
      <div className="signUp-section" onKeyDown={handleKeyDown}>
        <div className="signUp-input">
          <div className="signUp-header">
            <h3
              style={{
                marginBottom: "0px",
                marginTop: "10px",
                fontSize: "25px",
                fontWeight: "700",
              }}
              className="secondary-font "
            >
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
              Create new account for registry center!
            </span>
          </div>
          <div className="input-information">
            <TextInput
              value={signUpData.centerId}
              fieldName="Center ID"
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
              fieldName="Re-enter password"
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
            <div style={inputStyle} className="input-container">
              <div className="field-name-container">
                <span className="fieldName">Location</span>
                {correctIcon.districtCodeState &&
                correctIcon.provinceCodeState ? (
                  <span>
                    <CheckIcon sx={{ color: "green" }} />
                  </span>
                ) : null}
                {errorData.provinceCodeError?.length ? (
                  <span className="error-name primary-font">
                    {errorData.provinceCodeError}
                  </span>
                ) : errorData.districtCodeError?.length ? (
                  <span className="error-name primary-font">
                    {errorData.districtCodeError}
                  </span>
                ) : null}
              </div>
              <DropDownLocation
                buttonId="province-district-selector"
                setState={setProvinceAndDistrict}
                placeholder="Select province and district"
                containerStyle={{ width: "100%", marginBottom: "10px" }}
                // containerClassName="input-container"
              />
            </div>
            <TextInput
              value={signUpData.location}
              fieldName="Location details"
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
