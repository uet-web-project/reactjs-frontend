import React, { useState, useEffect } from "react";
import TextInput from "../../input/text-input/TextInput";
import { certificationHook } from "../../../redux/hooks/certificationHooks";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import StepperControl from "../stepper/StepperControl";
import CheckIcon from "@mui/icons-material/Check";

function VehicleInformation3() {
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();
  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const [errorData, changeErrorData] = useState({
    vinError: "",
    widthError: "",
    lengthError: "",
    vehicleTypeError: "",
  });
  const [iconState, changeIconState] = useState({
    vinState: false,
    widthState: false,
    lengthState: false,
    vehicleTypeState: false,
  });
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

  const fieldNameStyle = {
    marginTop: "3px",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "0.8rem",
  };
  useEffect(() => {
    if (certificateInformation.vin) {
      validateVin(certificateInformation.vin);
    }
    if (certificateInformation.width) {
      validateWidth(certificateInformation.width);
    }
    if (certificateInformation.length) {
      validateLength(certificateInformation.length);
    }
    if (certificateInformation.vehicleType) {
      validateVehicleType(certificateInformation.vehicleType);
    }
  }, []);
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
  function validateVin(vin: string) {
    if (vin.length == 0) {
      makeErrorChange("vinError", "Required");
      makeIconChange("vinState", false);
      return false;
    } else {
      makeErrorChange("vinError", "");
      makeIconChange("vinState", true);
      return true;
    }
  }

  function validateWidth(width: string) {
    if (width.length == 0) {
      makeErrorChange("widthError", "Required");
      makeIconChange("widthState", false);
      return false;
    } else if (Number.isNaN(Number(width))) {
      makeErrorChange("widthError", "Width must be a number");
      makeIconChange("widthState", false);
      return false;
    } else if (Number(width) <= 0) {
      makeErrorChange("widthError", "Width must be greater than 0");
      makeIconChange("widthState", false);
      return false;
    } else {
      makeErrorChange("widthError", "");
      makeIconChange("widthState", true);
      return true;
    }
  }

  function validateLength(length: string) {
    if (length.length == 0) {
      makeErrorChange("lengthError", "Required");
      makeIconChange("lengthState", false);
      return false;
    } else if (Number.isNaN(Number(length))) {
      makeErrorChange("lengthError", "Length must be a number");
      makeIconChange("lengthState", false);
      return false;
    } else if (Number(length) <= 0) {
      makeErrorChange("lengthError", "Length must be greater than 0");
      makeIconChange("lengthState", false);
      return false;
    } else {
      makeErrorChange("lengthError", "");
      makeIconChange("lengthState", true);
      return true;
    }
  }

  function validateVehicleType(vehicleType: string) {
    if (vehicleType.length == 0) {
      makeErrorChange("vehicleTypeError", "Required");
      makeIconChange("vehicleTypeState", false);
      return false;
    } else {
      makeErrorChange("vehicleTypeError", "");
      makeIconChange("vehicleTypeState", true);
      return true;
    }
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;
    if (direction == "next") {
      if (
        validateVin(certificateInformation.vin) &&
        validateWidth(certificateInformation.width) &&
        validateLength(certificateInformation.length) &&
        validateVehicleType(certificateInformation.vehicleType) &&
        newStep < 3
      ) {
        newStep += 0.2;
        setNewCertificationStep(newStep);
      }
    } else if (direction == "back") {
      newStep -= 0.1;
      setNewCertificationStep(newStep);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="Vin"
          type="text"
          value={certificateInformation.vin}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              vin: event.target.value,
            });
            makeErrorChange("vinError", "");
            makeIconChange("vinState", false);
          }}
          placeholder="Vin"
          error={errorData.vinError}
          showIcon={iconState.vinState}
        />

        <TextInput
          style={{ width: "100%" }}
          fieldName="Width"
          type="text"
          value={certificateInformation.width}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              width: event.target.value,
            });
            makeErrorChange("widthError", "");
            makeIconChange("widthState", false);
          }}
          placeholder="Width(mm)"
          error={errorData.widthError}
          showIcon={iconState.widthState}
        />
      </div>
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="Length"
          type="text"
          value={certificateInformation.length}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              length: event.target.value,
            });
            makeErrorChange("lengthError", "");
            makeIconChange("lengthState", false);
          }}
          placeholder="Length(mm)"
          error={errorData.lengthError}
          showIcon={iconState.lengthState}
        />

        <div style={{ width: "100%" }}>
          <div className="primary-font field-name-container">
            <span style={fieldNameStyle}>Vehicle Type</span>
            {iconState.vehicleTypeState == true ? (
              <span>
                <CheckIcon sx={{ color: "green" }} />
              </span>
            ) : null}
          </div>
          <select
            className="text-sm"
            style={inputStyle}
            value={certificateInformation.vehicleType}
            onChange={(event) =>
              setCertificateInformation({
                ...certificateInformation,
                vehicleType: event.target.value,
              })
            }
          >
            {/* <option value="car">-- Select an option --</option> */}
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="truck">Truck</option>
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

export default VehicleInformation3;
