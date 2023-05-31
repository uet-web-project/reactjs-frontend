import React, { useState } from "react";
import ".//styles.css";
import CSS from "csstype";
import TextInput from "../../components/input/text-input/TextInput";
import Button from "../../components/button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { certificateHook } from "../../redux/hooks/certificateHooks";
import CheckIcon from "@mui/icons-material/Check";
import { fabClasses } from "@mui/material";
function RegistrationCertificate() {
  const [certificateInformation, changeInformation] = useState({
    licensePlate: "",
    manufacturer: "",
    version: "",
    model: "",
    registrationNumber: "",
    registrationDate: "",
    registrationLocation: "",
    vehicleType: "car",
    purpose: "personal_transportation",
    vin: "",
    width: "",
    length: "",
    wheelBase: "",
    emission: "",
    mileage: "",
    vehicleOwnerCid: "",
    ownerName: "",
    ownerType: "personal",
    ownerPhoneNumber: "",
    ownerDob: "",
    ownerAddress: "",
  });

  const inputStyle = {
    width: "100%",
    height: "43px",
    borderRadius: "5px",
    border: "3px solid #dedede",
    marginBottom: "12px",
    padding: "10px",
    backgroundColor: "white",
    fontSize:"0.85rem"
  };

  const fieldNameStyle = {
    marginTop: "3px",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "0.8rem",
  };

  const [errorData, setError] = useState({
    licensePlateError: "",
    manufacturerError: "",
    versionError: "",
    modelError: "",
    registrationDateError: "",
    dateOfBirthError: "",
    registrationNumberError: "",
    registrationLocationError: "",
    vehicleTypeError: "",
    purposeError: "",
    vinError: "",
    widthError: "",
    lengthError: "",
    wheelBaseError: "",
    emissionError: "",
    mileageError: "",
    vehicleOwnerCidError: "",
    ownerNameError: "",
    ownerTypeError: "",
    ownerPhoneNumberError: "",
    ownerAddressError: "",
  });

  const [correctIcon, setIconState] = useState({
    licensePlateState: false,
    manufacturerState: false,
    versionState: false,
    modelState: false,
    registrationDateState: false,
    dateOfBirthState: false,
    registrationNumberState: false,
    registrationLocationState: false,
    vehicleTypeState: false,
    purposeState: false,
    vinState: false,
    widthState: false,
    lengthState: false,
    wheelBaseState: false,
    emissionState: false,
    mileageState: false,
    vehicleOwnerCidState: false,
    ownerNameState: false,
    ownerTypeState: false,
    ownerPhoneNumberState: false,
    ownerAddressState: false,
  });

  const { submitCertificate } = certificateHook();
  function showIcon(fieldName: string, value: boolean) {
    setIconState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  async function submit() {
    submitCertificate(certificateInformation, showError, showIcon);
  }
  function showError(fieldName: string, value: string) {
    setError((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }
  const [registrationDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    makeInformationChange("registrationDate", date);
  };

  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleDOBChange = (date: any) => {
    setDateOfBirth(date);
    makeInformationChange("ownerDob", date);
  };
  function makeInformationChange(fieldName: string, value: string) {
    changeInformation((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    if (fieldName === "purpose") {
      showIcon("purposeState", false);
    } else if (fieldName === "vehicleType") {
      showIcon("vehicleTypeState", false);
    } else if (fieldName === "ownerType") {
      showIcon("ownerTypeState", false);
    }
  }
  let submitBtnStyle: CSS.Properties = {
    width: "20%",
    height: "35px",
    marginTop: "30px",
    borderRadius: "10px",
  };
  return (
    <div className="registration-certificate-container">
      <div className="registration-certificate-header secondary-font">
        Registration Certificate
      </div>
      <div className="registration-certificate-form">
        <table className="vehicle-information">
          <tbody>
            <th colSpan={60} className="secondary-font">
              Vehicle information
            </th>
            <tr>
              <td colSpan={15}>
                <TextInput
                  fieldName="License plate"
                  type="text"
                  value={certificateInformation.licensePlate}
                  onChange={(event) =>
                    makeInformationChange("licensePlate", event.target.value)
                  }
                  placeholder="License plate"
                  error={errorData.licensePlateError}
                  showIcon={correctIcon.licensePlateState}
                />
              </td>
              <td colSpan={15}>
                <TextInput
                  fieldName="Manufacturer"
                  type="text"
                  value={certificateInformation.manufacturer}
                  onChange={(event) =>
                    makeInformationChange("manufacturer", event.target.value)
                  }
                  placeholder="Manufacturer"
                  error={errorData.manufacturerError}
                  showIcon={correctIcon.manufacturerState}
                />
              </td>
              <td colSpan={15}>
                <TextInput
                  fieldName="Version"
                  type="text"
                  value={certificateInformation.version}
                  onChange={(event) =>
                    makeInformationChange("version", event.target.value)
                  }
                  placeholder="Version"
                  error={errorData.versionError}
                  showIcon={correctIcon.versionState}
                />
              </td>
              <td colSpan={15}>
                <TextInput
                  fieldName="Model"
                  type="text"
                  value={certificateInformation.model}
                  onChange={(event) =>
                    makeInformationChange("model", event.target.value)
                  }
                  placeholder="Model"
                  error={errorData.modelError}
                  showIcon={correctIcon.modelState}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={15}>
                <TextInput
                  fieldName="Registration number"
                  type="text"
                  value={certificateInformation.registrationNumber}
                  onChange={(event) =>
                    makeInformationChange(
                      "registrationNumber",
                      event.target.value
                    )
                  }
                  placeholder="Registration number"
                  error={errorData.registrationNumberError}
                  showIcon={correctIcon.registrationNumberState}
                />
              </td>
              <td colSpan={15}>
                {/* <TextInput
                  fieldName="Registration date"
                  type="text"
                  value=""
                  onChange={() => {}}
                  placeholder="Registration date"
                /> */}
                <div>
                  <div className="primary-font field-name-container">
                    <span style={fieldNameStyle}>Registration date</span>
                    {correctIcon.registrationDateState == true ? (
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
                    className="date-picker text-sm"
                    selected={registrationDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                </div>
              </td>
              <td colSpan={15}>
                <TextInput
                  fieldName="Registration location"
                  type="text"
                  value={certificateInformation.registrationLocation}
                  onChange={(event) =>
                    makeInformationChange(
                      "registrationLocation",
                      event.target.value
                    )
                  }
                  placeholder="Registration location"
                  error={errorData.registrationLocationError}
                  showIcon={correctIcon.registrationLocationState}
                />
              </td>
              <td colSpan={9}>
                {/* <TextInput
                  fieldName="Purpose"
                  type="text"
                  value=""
                  onChange={() => {}}
                  placeholder="Purpose"
                /> */}

                {/* <p className="primary-font" style={fieldNameStyle}>
                  Purpose
                </p> */}
                <div className="primary-font field-name-container">
                  <span style={fieldNameStyle}>Purpose</span>
                  {correctIcon.purposeState == true ? (
                    <span>
                      <CheckIcon sx={{ color: "green" }} />
                    </span>
                  ) : null}
                </div>
                <select
                  className="text-sm"
                  style={inputStyle}
                  value={certificateInformation.purpose}
                  onChange={(e) =>
                    makeInformationChange("purpose", e.target.value)
                  }
                >
                  {/* <option value="car">-- Select an option --</option> */}
                  <option value="personal_transportation">
                    Personal transportation
                  </option>
                  <option value="public_transportation">
                    Public transportation
                  </option>
                  <option value="delivery">Delivery</option>
                </select>
              </td>
              <td colSpan={6}>
                {/* <TextInput
                  fieldName="Vehicle type"
                  type="text"
                  value=""
                  onChange={() => {}}
                  placeholder="Vehicle type"
                /> */}
                <div className="primary-font field-name-container">
                  <span style={fieldNameStyle}>Vehicle type</span>
                  {correctIcon.vehicleTypeState == true ? (
                    <span>
                      <CheckIcon sx={{ color: "green" }} />
                    </span>
                  ) : null}
                </div>
                <select
                  className="text-sm"
                  style={inputStyle}
                  value={certificateInformation.vehicleType}
                  onChange={(e) =>
                    makeInformationChange("vehicleType", e.target.value)
                  }
                >
                  {/* <option value="car">-- Select an option --</option> */}
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="trunk">Trunk</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={15}>
                <TextInput
                  fieldName="Vin"
                  type="text"
                  value={certificateInformation.vin}
                  onChange={(event) =>
                    makeInformationChange("vin", event.target.value)
                  }
                  placeholder="Vin"
                  error={errorData.vinError}
                  showIcon={correctIcon.vinState}
                />
              </td>
              <td colSpan={8}>
                <TextInput
                  fieldName="Width"
                  type="text"
                  value={certificateInformation.width}
                  onChange={(event) =>
                    makeInformationChange("width", event.target.value)
                  }
                  placeholder="Width"
                  error={errorData.widthError}
                  showIcon={correctIcon.widthState}
                />
              </td>
              <td colSpan={7}>
                <TextInput
                  fieldName="Length"
                  type="text"
                  value={certificateInformation.length}
                  onChange={(event) =>
                    makeInformationChange("length", event.target.value)
                  }
                  placeholder="Length"
                  error={errorData.lengthError}
                  showIcon={correctIcon.lengthState}
                />
              </td>
              <td colSpan={10}>
                <TextInput
                  fieldName="Wheel base"
                  type="text"
                  value={certificateInformation.wheelBase}
                  onChange={(event) =>
                    makeInformationChange("wheelBase", event.target.value)
                  }
                  placeholder="Wheel base"
                  error={errorData.wheelBaseError}
                  showIcon={correctIcon.wheelBaseState}
                />
              </td>
              <td colSpan={10}>
                <TextInput
                  fieldName="Emission"
                  type="text"
                  value={certificateInformation.emission}
                  onChange={(event) =>
                    makeInformationChange("emission", event.target.value)
                  }
                  placeholder="Emission"
                  error={errorData.emissionError}
                  showIcon={correctIcon.emissionState}
                />
              </td>
              <td colSpan={10}>
                <TextInput
                  fieldName="Mileage"
                  type="text"
                  value={certificateInformation.mileage}
                  onChange={(event) =>
                    makeInformationChange("mileage", event.target.value)
                  }
                  placeholder="Mileage"
                  error={errorData.mileageError}
                  showIcon={correctIcon.mileageState}
                />
              </td>
            </tr>
            <tr>
              <th colSpan={60} className="secondary-font ">
                {" "}
                Owner information
              </th>
            </tr>
            <tr>
              <td colSpan={15}>
                <TextInput
                  fieldName="CID"
                  type="text"
                  value={certificateInformation.vehicleOwnerCid}
                  onChange={(event) =>
                    makeInformationChange("vehicleOwnerCid", event.target.value)
                  }
                  placeholder="CID"
                  error={errorData.vehicleOwnerCidError}
                  showIcon={correctIcon.vehicleOwnerCidState}
                />
              </td>
              <td colSpan={8}>
                <TextInput
                  fieldName="Name"
                  type="text"
                  value={certificateInformation.ownerName}
                  onChange={(event) =>
                    makeInformationChange("ownerName", event.target.value)
                  }
                  placeholder="Name"
                  error={errorData.ownerNameError}
                  showIcon={correctIcon.ownerNameState}
                />
              </td>
              <td colSpan={7}>
                <TextInput
                  fieldName="Phone number"
                  type="text"
                  value={certificateInformation.ownerPhoneNumber}
                  onChange={(event) =>
                    makeInformationChange(
                      "ownerPhoneNumber",
                      event.target.value
                    )
                  }
                  placeholder="Phone number"
                  error={errorData.ownerPhoneNumberError}
                  showIcon={correctIcon.ownerPhoneNumberState}
                />
              </td>
              <td colSpan={8}>
                {/* <TextInput
                  fieldName="Date of birth"
                  type="text"
                  value={certificateInformation.dateOfBirth}
                  onChange={(event) => makeInformationChange("dateOfBirth",event)}
                  placeholder="Date of birth"
                /> */}

                <div>
                  <div className="primary-font field-name-container">
                    <span style={fieldNameStyle}>Date of birth</span>
                    {correctIcon.dateOfBirthState == true ? (
                      <span>
                        <CheckIcon sx={{ color: "green" }} />
                      </span>
                    ) : null}
                    {errorData.dateOfBirthError.length ? (
                      <span className="error-name primary-font">
                        {errorData.dateOfBirthError}
                      </span>
                    ) : null}
                    {/* <span className="error-name">{errorData.dateOfBirthError}</span> */}
                  </div>
                  <DatePicker
                    className="date-picker text-sm"
                    selected={dateOfBirth}
                    onChange={handleDOBChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                  />
                </div>
              </td>

              <td colSpan={7}>
                <div className="primary-font field-name-container">
                  <span style={fieldNameStyle}>Owner type</span>
                  {correctIcon.ownerTypeState == true ? (
                    <span>
                      <CheckIcon sx={{ color: "green" }} />
                    </span>
                  ) : null}
                </div>
                <select
                  className="text-sm"
                  style={inputStyle}
                  value={certificateInformation.ownerType}
                  onChange={(e) =>
                    makeInformationChange("ownerType", e.target.value)
                  }
                >
                  {/* <option value="car">-- Select an option --</option> */}
                  <option value="personal">Personal</option>
                  <option value="company">Company</option>
                </select>
              </td>
              <td colSpan={15}>
                <TextInput
                  fieldName="Address"
                  type="text"
                  value={certificateInformation.ownerAddress}
                  onChange={(event) =>
                    makeInformationChange("ownerAddress", event.target.value)
                  }
                  placeholder="Address"
                  error={errorData.ownerAddressError}
                  showIcon={correctIcon.ownerAddressState}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button onClick={submit} content="submit" style={submitBtnStyle} />
    </div>
  );
}

export default RegistrationCertificate;
