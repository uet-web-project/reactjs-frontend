import React, { useState, useEffect } from "react";
import TextInput from "../../input/text-input/TextInput";
import { certificationHook } from "../../../redux/hooks/certificationHooks";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import StepperControl from "../stepper/StepperControl";
import CheckIcon from "@mui/icons-material/Check";
import DatePicker from "react-datepicker";
import "./styles.css";

function VehicleInformation() {
  const fieldNameStyle = {
    marginTop: "3px",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "0.8rem",
  };
  const inputStyle = {
    width: "100%",
    height: "43px",
    borderRadius: "5px",
    border: "3px solid #dedede",
    marginBottom: "12px",
    padding: "10px",
    backgroundColor: "white",
    fontSize: "0.85rem",
  };
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();
  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const [errorData, changeErrorData] = useState({
    registrationNumberError: "",
    registrationDateError: "",
    registrationLocationError: "",
    purposeError: "",
  });
  const [iconState, changeIconState] = useState({
    registrationNumberState: false,
    registrationDateState: false,
    registrationLocationState: false,
    purposeState: false,
  });

  //   useEffect(() => {
  //     if (certificateInformation.manufacturer) {
  //       validateRegistrationNumber(certificateInformation.registrationNumber);
  //       validateRegistrationLocation(certificateInformation.registrationLocation);
  //       validateRegistrationDate(certificateInformation.registrationDate);
  //       validatePurpose(certificateInformation.purpose);
  //     }
  //   }, []);
  function makeErrorChange(fieldName: string, errorMessage: string) {
    changeErrorData((prev) => ({
      ...prev,
      [fieldName]: errorMessage,
    }));
  }

  function makeIconChange(fieldName: string, state: boolean) {
    changeIconState((prev) => ({
      ...prev,
      [fieldName]: state,
    }));
  }
  function validateRegistrationNumber(registrationNumber: string) {
    if (registrationNumber.length == 0) {
      makeErrorChange(
        "registrationNumberError",
        "Required"
      );
      console.log(errorData.registrationNumberError);
      makeIconChange("registrationNumberState", false);
      return false;
    } else {
      makeErrorChange("registrationNumberError", "");
      makeIconChange("registrationNumberState", true);
      return true;
    }
  }

  function validateRegistrationDate(registrationDate: Date) {
    if (registrationDate) {
      makeErrorChange("registrationDateError", "Required");
      console.log(errorData.registrationDateError);
      makeIconChange("registrationDateState", false);
      return false;
    } else {
      makeErrorChange("registrationDateError", "");
      makeIconChange("registrationDateState", true);
      return true;
    }
  }

  function validateRegistrationLocation(registrationLocation: string) {
    if (registrationLocation.length == 0) {
      makeErrorChange(
        "registrationLocationError",
        "Required"
      );
      makeIconChange("registrationLocationState", false);
      return false;
    } else {
      makeErrorChange("registrationLocationError", "");
      makeIconChange("registrationLocationState", true);
      return true;
    }
  }

  function validatePurpose(purpose: string) {
    if (purpose.length == 0) {
      makeErrorChange("purposeError", "Required");
      makeIconChange("purposeState", false);
      return false;
    } else {
      makeErrorChange("purposeError", "");
      makeIconChange("purposeState", true);
      return true;
    }
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;
    if (direction == "next") {
      if (
        validateRegistrationNumber(certificateInformation.registrationNumber) &&
        validateRegistrationLocation(certificateInformation.registrationLocation) &&
        validateRegistrationDate(certificateInformation.registrationDate) &&
        validatePurpose(certificateInformation.purpose) &&
        newStep < 3
      ) {
        newStep += 0.1;
        setNewCertificationStep(newStep);
      }
    } else if (direction == "back") {
      if (newStep > 0) {
        newStep -= 0.1;
        setNewCertificationStep(newStep);
      }
    }
    // direction == "next" ? newStep++ : newStep--;

    // newStep >= 0 && newStep <= 3 && setNewCertificationStep(newStep);
  };
  return (
    <div className="flex flex-col">
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="Registration number"
          type="text"
          value={certificateInformation.registrationNumber}
          onChange={(event) =>
            setCertificateInformation({
              ...certificateInformation,
              registrationNumber: event.target.value,
            })
          }
          placeholder="Registration number"
          error={errorData.registrationNumberError}
          showIcon={iconState.registrationNumberState}
        />

        <TextInput
          style={{ width: "100%" }}
          fieldName="Registration location"
          type="text"
          value={certificateInformation.registrationLocation}
          onChange={(event) =>
            setCertificateInformation({
              ...certificateInformation,
              registrationLocation: event.target.value,
            })
          }
          placeholder="Registration location"
          error={errorData.registrationLocationError}
          showIcon={iconState.registrationLocationState}
        />
      </div>
      <div className="bg-white my-2 p-1 flex ">
        <div style={{ width: "100%", marginRight: "30px" }}>
          <div className="primary-font field-name-container">
            <span style={fieldNameStyle}>Registration date</span>
            {iconState.registrationDateState == true ? (
              <span>
                <CheckIcon sx={{ color: "green" }} />
              </span>
            ) : null}
            {errorData.registrationDateError.length ? (
              <span className="error-name primary-font">
                {errorData.registrationDateError}
              </span>
            ) : null}
          </div>
          <DatePicker
            className="date-picker text-sm "
            selected={certificateInformation.registrationDate}
            onChange={(event: any) =>
              setCertificateInformation({
                ...certificateInformation,
                registrationLocation: event.target.value,
              })
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
          />
        </div>
        <div style={{ width: "100%" }}>
          <div className="primary-font field-name-container">
            <span style={fieldNameStyle}>Purpose</span>
            {iconState.purposeState == true ? (
              <span>
                <CheckIcon sx={{ color: "green" }} />
              </span>
            ) : null}
          </div>
          <select
            className="text-sm"
            style={inputStyle}
            value={certificateInformation.purpose}
            onChange={(event) =>
              setCertificateInformation({
                ...certificateInformation,
                purpose: event.target.value,
              })
            }
          >
            {/* <option value="car">-- Select an option --</option> */}
            <option value="personal_transportation">
              Personal transportation
            </option>
            <option value="public_transportation">Public transportation</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
      </div>
      <StepperControl
        handleClick={handleClick}
        currentStep={certificationStep}
        steps={steps}
      />
    </div>
  );
}

export default VehicleInformation;
