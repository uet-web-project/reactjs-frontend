import React, { useState } from "react";
import TextInput from "../input/text-input/TextInput";
import { certificationHook } from "../../redux/hooks/certificationHooks";

function VehicleInformation() {
  const [errorData, changeErrorData] = useState({
    licensePlateError: "",
    manufacturerError: "",
  });
  const [iconState, changeIconState] = useState({
    licensePlateState: false,
    manufacturerState: false,
  });
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
      makeErrorChange("manufacturerError", "Manufacturer is required");
      makeIconChange("manufacturerState", false);
      return false;
    }
    makeErrorChange("manufacturerError", "");
    makeIconChange("manufacturerState", true);
    return true;
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();
  return (
    <div className="flex flex-col">
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%" }}
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
      </div>
    </div>
  );
}

export default VehicleInformation;
