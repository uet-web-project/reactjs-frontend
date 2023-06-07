import React, { useState, useEffect } from "react";
import TextInput from "../../input/text-input/TextInput";
import { certificationHook } from "../../../redux/hooks/certificationHooks";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import StepperControl from "../stepper/StepperControl";
import CheckIcon from "@mui/icons-material/Check";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./styles.css";

function OwnerInformation() {
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();
  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const [errorData, changeErrorData] = useState({
    CidError: "",
    nameError: "",
    phoneNumberError: "",
    dateOfBirthError: "",
  });
  const [iconState, changeIconState] = useState({
    CidState: false,
    nameState: false,
    phoneNumberState: false,
    dateOfBirthState: false,
  });

  const [dobState, changeDobState] = useState<Dayjs | null>(dayjs(new Date()));
  const fieldNameStyle = {
    marginTop: "3px",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "0.8rem",
  };

  useEffect(() => {
    if (certificateInformation.vehicleOwnerCid) {
      validateCid(certificateInformation.vehicleOwnerCid);
    }
    if (certificateInformation.ownerName) {
      validateName(certificateInformation.ownerName);
    }
    if (certificateInformation.ownerPhoneNumber) {
      validatePhoneNumber(certificateInformation.ownerPhoneNumber);
    }
    if (certificateInformation.ownerDob) {
      validateDateOfBirth(certificateInformation.ownerDob);
    }
  }, []);

  const handleDOBChange = (date: Dayjs | null) => {
    if (date) {
      changeDobState(date);
      setCertificateInformation({
        ...certificateInformation,
        ownerDob: date.toISOString(),
      });
    }
  };
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
  function validateCid(Cid: string) {
    if (Cid.length == 0) {
      makeErrorChange("CidError", "Required");
      makeIconChange("CidState", false);
      return false;
    } else if (
      Number.isNaN(Number(Cid)) ||
      parseFloat(Cid) < 0 ||
      !Number.isInteger(Number(Cid))
    ) {
      makeErrorChange("CidError", "Cid must be a integer number");
      makeIconChange("CidState", false);
      return false;
    } else {
      makeErrorChange("CidError", "");
      makeIconChange("CidState", true);
      return true;
    }
  }

  function validateName(name: string) {
    if (name.length == 0) {
      makeErrorChange("nameError", "Required");
      makeIconChange("nameState", false);
      return false;
    } else {
      makeErrorChange("nameError", "");
      makeIconChange("nameState", true);
      return true;
    }
  }

  function validatePhoneNumber(phoneNumber: string) {
    if (phoneNumber.length == 0) {
      makeErrorChange("phoneNumberError", "Required");
      makeIconChange("phoneNumberState", false);
      return false;
    } else if (
      Number.isNaN(Number(phoneNumber)) ||
      parseFloat(phoneNumber) < 0 ||
      !Number.isInteger(Number(phoneNumber))
    ) {
      makeErrorChange("phoneNumberError", "Must be a integer number");
      makeIconChange("phoneNumberState", false);
      return false;
    } else {
      makeErrorChange("phoneNumberError", "");
      makeIconChange("phoneNumberState", true);
      return true;
    }
  }

  function validateDateOfBirth(dateOfBirth: string) {
    if (dateOfBirth.length == 0) {
      makeErrorChange("dateOfBirthError", "Required");
      makeIconChange("dateOfBirthState", false);
      return false;
    } else {
      makeErrorChange("dateOfBirthError", "");
      makeIconChange("dateOfBirthState", true);
      return true;
    }
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;
    if (direction == "next") {
      if (
        validateCid(certificateInformation.vehicleOwnerCid) &&
        validateName(certificateInformation.ownerName) &&
        validatePhoneNumber(certificateInformation.ownerPhoneNumber) &&
        validateDateOfBirth(certificateInformation.ownerDob) &&
        newStep < 3
      ) {
        newStep += 0.1;
        setNewCertificationStep(newStep);
      }
    } else if (direction == "back") {
      newStep -= 0.6;
      setNewCertificationStep(newStep);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="CID"
          type="text"
          value={certificateInformation.vehicleOwnerCid}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              vehicleOwnerCid: event.target.value,
            });
            makeErrorChange("CidError", "");
            makeIconChange("CidState", false);
          }}
          placeholder="CID"
          error={errorData.CidError}
          showIcon={iconState.CidState}
        />

        <TextInput
          style={{ width: "100%" }}
          fieldName="Name"
          type="text"
          value={certificateInformation.ownerName}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              ownerName: event.target.value,
            });
            makeErrorChange("nameError", "");
            makeIconChange("nameState", false);
          }}
          placeholder="Name"
          error={errorData.nameError}
          showIcon={iconState.nameState}
        />
      </div>
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="Phone number"
          type="text"
          value={certificateInformation.ownerPhoneNumber}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              ownerPhoneNumber: event.target.value,
            });
            makeErrorChange("phoneNumberError", "");
            makeIconChange("phoneNumberState", false);
          }}
          placeholder="Phone number"
          error={errorData.phoneNumberError}
          showIcon={iconState.phoneNumberState}
        />

        <div style={{ width: "100%" }}>
          <div className="primary-font field-name-container">
            <span style={fieldNameStyle}>Date Of Birth</span>
            {iconState.dateOfBirthState == true ? (
              <span>
                <CheckIcon sx={{ color: "green" }} />
              </span>
            ) : null}
            {errorData.dateOfBirthError.length ? (
              <span className="error-name primary-font">
                {errorData.dateOfBirthError}
              </span>
            ) : null}
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              className="date-picker"
              value={dobState}
              onChange={(newValue) => {
                handleDOBChange(newValue);
              }}
            />
          </LocalizationProvider>
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

export default OwnerInformation;
