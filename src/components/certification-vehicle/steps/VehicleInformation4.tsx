import React, { useState, useEffect } from "react";
import TextInput from "../../input/text-input/TextInput";
import { certificationHook } from "../../../redux/hooks/certificationHooks";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import StepperControl from "../stepper/StepperControl";

function VehicleInformation4() {
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();
  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const [errorData, changeErrorData] = useState({
    wheelBaseError: "",
    emissionError: "",
    mileageError: "",
  });
  const [iconState, changeIconState] = useState({
    wheelBaseState: false,
    emissionState: false,
    mileageState: false,
  });

  useEffect(() => {
    if (certificateInformation.wheelBase) {
      validateWheelBase(certificateInformation.wheelBase);
    }
    if (certificateInformation.emission) {
      validateEmission(certificateInformation.emission);
    }
    if (certificateInformation.mileage) {
      validateMileage(certificateInformation.mileage);
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
  function validateWheelBase(wheelBase: string) {
    if (wheelBase.length == 0) {
      makeErrorChange("wheelBaseError", "Required");
      makeIconChange("wheelBaseState", false);
      return false;
    } else if (Number.isNaN(Number(wheelBase))) {
      makeErrorChange("wheelBaseError", "Wheel base must be a number");
      makeIconChange("wheelBaseState", false);
      return false;
    } else if (Number(wheelBase) <= 0) {
      makeErrorChange("wheelBaseError", "Wheelbase must be greater than 0");
      makeIconChange("wheelBaseState", false);
      return false;
    } else {
      makeErrorChange("wheelBaseError", "");
      makeIconChange("wheelBaseState", true);
      return true;
    }
  }

  function validateEmission(emission: string) {
    if (emission.length == 0) {
      makeErrorChange("emissionError", "Required");
      makeIconChange("emissionState", false);
      return false;
    } else if (Number.isNaN(Number(emission))) {
      makeErrorChange("emissionError", "Emission must be a number");
      makeIconChange("emissionState", false);
      return false;
    } else if (Number(emission) <= 0) {
      makeErrorChange("emissionError", "Emission must be greater than 0");
      makeIconChange("emissionState", false);
      return false;
    } else {
      makeErrorChange("emissionError", "");
      makeIconChange("emissionState", true);
      return true;
    }
  }

  function validateMileage(mileage: string) {
    if (mileage.length == 0) {
      makeErrorChange("mileageError", "Required");
      makeIconChange("mileageState", false);
      return false;
    } else if (Number.isNaN(Number(mileage))) {
      makeErrorChange("mileageError", "Mileage must be a number");
      makeIconChange("mileageState", false);
      return false;
    } else if (Number(mileage) <= 0) {
      makeErrorChange("mileageError", "Mileage must be greater than 0");
      makeIconChange("mileageState", false);
      return false;
    } else {
      makeErrorChange("mileageError", "");
      makeIconChange("mileageState", true);
      return true;
    }
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;
    if (direction == "next") {
      if (
        validateWheelBase(certificateInformation.wheelBase) &&
        validateEmission(certificateInformation.emission) &&
        validateMileage(certificateInformation.mileage) &&
        newStep < 3
      ) {
        newStep += 0.6;
        setNewCertificationStep(newStep);
      }
    } else if (direction == "back") {
      newStep -= 0.2;
      setNewCertificationStep(newStep);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="Wheel Base"
          type="text"
          value={certificateInformation.wheelBase}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              wheelBase: event.target.value,
            });
            makeErrorChange("wheelBaseError", "");
            makeIconChange("wheelBaseState", false);
          }}
          placeholder="Wheel Base (mm)"
          error={errorData.wheelBaseError}
          showIcon={iconState.wheelBaseState}
        />

        <TextInput
          style={{ width: "100%" }}
          fieldName="Emission"
          type="text"
          value={certificateInformation.emission}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              emission: event.target.value,
            });
            makeErrorChange("emissionError", "");
            makeIconChange("emissionState", false);
          }}
          placeholder="Emission (kg/km)"
          error={errorData.emissionError}
          showIcon={iconState.emissionState}
        />
      </div>
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%" }}
          fieldName="Mileage"
          type="text"
          value={certificateInformation.mileage}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              mileage: event.target.value,
            });
            makeErrorChange("mileageError", "");
            makeIconChange("mileageState", false);
          }}
          placeholder="Mileage (km)"
          error={errorData.mileageError}
          showIcon={iconState.mileageState}
        />
      </div>
      <StepperControl
        handleClick={handleClick}
        currentStep={certificationStep}
        steps={steps}
      />
    </div>
  );
}

export default VehicleInformation4;
