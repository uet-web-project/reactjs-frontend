import React, { useState, useEffect } from "react";
import TextInput from "../../input/text-input/TextInput";
import { certificationHook } from "../../../redux/hooks/certificationHooks";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import StepperControl from "../stepper/StepperControl";

function VehicleInformation() {
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();
  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const [errorData, changeErrorData] = useState({
    licensePlateError: "",
    manufacturerError: "",
    versionError: "",
    modelError: "",
  });
  const [iconState, changeIconState] = useState({
    licensePlateState: false,
    manufacturerState: false,
    versionState: false,
    modelState: false,
  });

  useEffect(() => {
    if (certificateInformation.manufacturer) {
      validateManufacturer("manufacturerError");
      validateLicensePlate("licensePlateError");
      validateVersion("version");
      validateModel("model");
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
  function validateManufacturer(manufacturer: string) {
    if (manufacturer.length == 0) {
  
      makeErrorChange("manufacturerError", "Required");
      console.log(errorData.manufacturerError);
      makeIconChange("manufacturerState", false);
      return false;
    } else {
      makeErrorChange("manufacturerError", "");
      makeIconChange("manufacturerState", true);
      return true;
    }
  }

  function validateLicensePlate(licensePlate: string) {
    if (licensePlate.length == 0) {
      makeErrorChange("licensePlateError", "Required");
      console.log(errorData.licensePlateError);
      makeIconChange("licensePlateState", false);
      return false;
    } else {
      makeErrorChange("licensePlateError", "");
      makeIconChange("licensePlateState", true);
      return true;
    }
  }

  function validateVersion(version: string) {
    if (version.length == 0) {
      makeErrorChange("versionError", "Required");
      makeIconChange("versionState", false);
      return false;
    } else {
      makeErrorChange("versionError", "");
      makeIconChange("versionState", true);
      return true;
    }
  }

  function validateModel(model: string) {
    if (model.length == 0) {
      makeErrorChange("modelError", "Required");
      makeIconChange("modelState", false);
      return false;
    } else {
      makeErrorChange("modelError", "");
      makeIconChange("modelState", true);
      return true;
    }
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;
    console.log(certificateInformation.manufacturer);
    console.log("a" + errorData.manufacturerError);
    if (direction == "next") {
      if (
        validateLicensePlate(certificateInformation.licensePlate) &&
        validateManufacturer(certificateInformation.manufacturer) &&
        validateVersion(certificateInformation.version) &&
        validateModel(certificateInformation.model) &&
        newStep < 3
      ) {
        newStep+=0.1
        setNewCertificationStep(newStep);
        makeIconChange("manufacturerState", true);
      }
    } else if (direction == "back") {
      if (newStep > 0) {
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
          fieldName="License plate"
          type="text"
          value={certificateInformation.licensePlate}
          onChange={(event) =>
            setCertificateInformation({
              ...certificateInformation,
              licensePlate: event.target.value,
            })
          }
          placeholder="License plate"
          error={errorData.licensePlateError}
          showIcon={iconState.licensePlateState}
        />

        <TextInput
          style={{ width: "100%" }}
          fieldName="Manufacturer"
          type="text"
          value={certificateInformation.manufacturer}
          onChange={(event) =>
            setCertificateInformation({
              ...certificateInformation,
              manufacturer: event.target.value,
            })
          }
          placeholder="Manufacturer"
          error={errorData.manufacturerError}
          showIcon={iconState.manufacturerState}
        />
      </div>
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%", marginRight: "30px" }}
          fieldName="Version"
          type="text"
          value={certificateInformation.version}
          onChange={(event) =>
            setCertificateInformation({
              ...certificateInformation,
              version: event.target.value,
            })
          }
          placeholder="Version"
          error={errorData.versionError}
          showIcon={iconState.versionState}
        />

        <TextInput
          style={{ width: "100%" }}
          fieldName="Model"
          type="text"
          value={certificateInformation.model}
          onChange={(event) =>
            setCertificateInformation({
              ...certificateInformation,
              model: event.target.value,
            })
          }
          placeholder="Model"
          error={errorData.modelError}
          showIcon={iconState.modelState}
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

export default VehicleInformation;
