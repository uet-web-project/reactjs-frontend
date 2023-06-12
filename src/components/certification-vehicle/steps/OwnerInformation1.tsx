import React, { useState, useEffect } from "react";
import TextInput from "../../input/text-input/TextInput";
import { certificationHook } from "../../../redux/hooks/certificationHooks";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import StepperControl from "../stepper/StepperControl";
import CheckIcon from "@mui/icons-material/Check";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/axios";
import { getAPI } from "../../../api/getAPI";
import { postAPI } from "../../../api/postAPI";

function OwnerInformation1() {
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();
  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const [errorData, changeErrorData] = useState({
    addressError: "",
    ownerTypeError: "",
  });
  const [iconState, changeIconState] = useState({
    addresState: false,
    ownerTypeState: false,
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
    if (certificateInformation.ownerAddress) {
      validateAddress(certificateInformation.vin);
    }
    if (certificateInformation.ownerType) {
      validateOwnerType(certificateInformation.ownerType);
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
  function validateAddress(address: string) {
    if (address.length == 0) {
      makeErrorChange("addressError", "Required");
      makeIconChange("addressState", false);
      return false;
    } else {
      makeErrorChange("addressrror", "");
      makeIconChange("addressState", true);
      return true;
    }
  }

  function validateOwnerType(ownerType: string) {
    if (ownerType.length == 0) {
      makeErrorChange("ownerTypeError", "Required");
      makeIconChange("ownerTypeState", false);
      return false;
    } else {
      makeErrorChange("ownerTypeError", "");
      makeIconChange("ownerTypeState", true);
      return true;
    }
  }
  const { certificateInformation, setCertificateInformation } =
    certificationHook();

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;
    if (direction == "next") {
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure to submit this registration certificate?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          validateAddress(certificateInformation.ownerAddress);
          validateOwnerType(certificateInformation.ownerType);
          if (
            validateAddress(certificateInformation.ownerAddress) &&
            validateOwnerType(certificateInformation.ownerType)
          ) {
            try {
              const centerInforRes = await axiosInstance.get(
                getAPI().getCenterProfile
              );
              if (centerInforRes.status === 200) {
                const centerId = centerInforRes.data.centerId;

                const vehicleCertificate = await axiosInstance.post(
                  postAPI().createVehicleFromCertificate,
                  {
                    certificate: {
                      ...certificateInformation,
                      registrationCenterId: centerId,
                      width: Number(certificateInformation.width),
                      length: Number(certificateInformation.length),
                      wheelBase: Number(certificateInformation.wheelBase),
                      emission: Number(certificateInformation.emission),
                      mileage: Number(certificateInformation.mileage),
                    },
                  }
                );
                if (vehicleCertificate.status === 200) {
                  newStep = 2;
                  setNewCertificationStep(newStep);
                }
              }
            } catch (err: any) {
              console.log(err);

              Swal.fire({
                icon: "error",
                title: "Create failed",
                text: err.response.data.message,
              });
            }
          }
        } else if (result.isDismissed) {
        }
      });
    } else if (direction == "back") {
      newStep -= 0.1;
      setNewCertificationStep(newStep);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="bg-white my-2 p-1 flex ">
        <TextInput
          style={{ width: "100%" }}
          fieldName="Address"
          type="text"
          value={certificateInformation.ownerAddress}
          onChange={(event) => {
            setCertificateInformation({
              ...certificateInformation,
              ownerAddress: event.target.value,
            });
            makeErrorChange("addressError", "");
            makeIconChange("addressState", false);
          }}
          placeholder="Address"
          error={errorData.addressError}
          showIcon={iconState.addresState}
        />
      </div>
      <div className="bg-white my-2 p-1 flex ">
        <div style={{ width: "100%" }}>
          <div className="primary-font field-name-container">
            <span style={fieldNameStyle}>Owner Type</span>
            {iconState.ownerTypeState == true ? (
              <span>
                <CheckIcon sx={{ color: "green" }} />
              </span>
            ) : null}
          </div>
          <select
            className="text-sm"
            style={inputStyle}
            value={certificateInformation.ownerType}
            onChange={(event) =>
              setCertificateInformation({
                ...certificateInformation,
                ownerType: event.target.value,
              })
            }
          >
            <option value="personal">Personal</option>
            <option value="company">Company</option>
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

export default OwnerInformation1;
