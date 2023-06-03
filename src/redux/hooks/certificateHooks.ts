import axiosInstance from "../../utils/axios";
import { getAPI } from "../../api/getAPI";
import { postAPI } from "../../api/postAPI";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { setDepLoginState } from "../slices/accountSlice";
import { RootState, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { validateDate } from "@mui/x-date-pickers/internals";

export const certificateHook = () => {
  const dispatch = useDispatch();

  async function submitCertificate(
    certificateInformation: {
      licensePlate: string;
      manufacturer: string;
      version: string;
      model: string;
      registrationNumber: string;
      registrationDate: string;
      registrationLocation: string;
      vehicleType: string;
      purpose: string;
      vin: string;
      width: string;
      length: string;
      wheelBase: string;
      emission: string;
      mileage: string;
      vehicleOwnerCid: string;
      ownerName: string;
      ownerPhoneNumber: string;
      ownerDob: string;
      ownerType: string;
      ownerAddress: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure to save this registration certificate?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        validateLicensePlate(
          certificateInformation.licensePlate,
          showError,
          showIcon
        );
        validateManufacturer(
          certificateInformation.manufacturer,
          showError,
          showIcon
        );
        validateVersion(certificateInformation.version, showError, showIcon);
        validateModel(certificateInformation.model, showError, showIcon);
        validateRegistrationNumber(
          certificateInformation.registrationNumber,
          showError,
          showIcon
        );
        validateRegistrationDate(
          certificateInformation.registrationDate,
          showError,
          showIcon
        );
        validateRegistrationLocation(
          certificateInformation.registrationLocation,
          showError,
          showIcon
        );
        validatePurpose(
          certificateInformation.registrationLocation,
          showError,
          showIcon
        );
        validateVehicleType(
          certificateInformation.vehicleType,
          showError,
          showIcon
        );
        validateVin(certificateInformation.vin, showError, showIcon);
        validateWidth(certificateInformation.width, showError, showIcon);
        validateLength(certificateInformation.length, showError, showIcon);
        validateWheelBase(
          certificateInformation.wheelBase,
          showError,
          showIcon
        );
        validateEmission(certificateInformation.emission, showError, showIcon);
        validateMileage(certificateInformation.mileage, showError, showIcon);
        validateVehicleOwnerCid(
          certificateInformation.vehicleOwnerCid,
          showError,
          showIcon
        );
        validateName(certificateInformation.ownerName, showError, showIcon);
        validatePhoneNumber(
          certificateInformation.ownerPhoneNumber,
          showError,
          showIcon
        );
        validateOwnerDob(certificateInformation.ownerDob, showError, showIcon);
        validateOwnerType(
          certificateInformation.ownerType,
          showError,
          showIcon
        );
        validateAddress(
          certificateInformation.ownerAddress,
          showError,
          showIcon
        );
        showIcon("purposeState", true);
        showIcon("vehicleTypeState", true);
        showIcon("ownerType", true);

        if (
          validateVersion(
            certificateInformation.version,
            showError,
            showIcon
          ) &&
          validateModel(certificateInformation.model, showError, showIcon) &&
          validateRegistrationNumber(
            certificateInformation.registrationNumber,
            showError,
            showIcon
          ) &&
          validateRegistrationLocation(
            certificateInformation.registrationLocation,
            showError,
            showIcon
          ) &&
          validatePurpose(
            certificateInformation.registrationLocation,
            showError,
            showIcon
          ) &&
          validateVehicleType(
            certificateInformation.vehicleType,
            showError,
            showIcon
          ) &&
          validateVin(certificateInformation.vin, showError, showIcon) &&
          validateWidth(certificateInformation.width, showError, showIcon) &&
          validateLength(certificateInformation.length, showError, showIcon) &&
          validateWheelBase(
            certificateInformation.wheelBase,
            showError,
            showIcon
          ) &&
          validateEmission(
            certificateInformation.emission,
            showError,
            showIcon
          ) &&
          validateMileage(
            certificateInformation.mileage,
            showError,
            showIcon
          ) &&
          validateVehicleOwnerCid(
            certificateInformation.vehicleOwnerCid,
            showError,
            showIcon
          ) &&
          validateName(certificateInformation.ownerName, showError, showIcon) &&
          validatePhoneNumber(
            certificateInformation.ownerPhoneNumber,
            showError,
            showIcon
          ) &&
          validateOwnerDob(
            certificateInformation.ownerDob,
            showError,
            showIcon
          ) &&
          validateOwnerType(
            certificateInformation.ownerType,
            showError,
            showIcon
          ) &&
          validateAddress(
            certificateInformation.ownerAddress,
            showError,
            showIcon
          )
        ) {
          try {
            alert("abc");
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
                    ownerDob: new Date(
                      certificateInformation.ownerDob
                    ).toISOString(),
                    width: Number(certificateInformation.width),
                    length: Number(certificateInformation.length),
                    wheelBase: Number(certificateInformation.wheelBase),
                    emission: Number(certificateInformation.emission),
                    mileage: Number(certificateInformation.mileage),
                  },
                }
              );
              if (vehicleCertificate.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Create new vehicle certificate successfully!",
                  confirmButtonText: "OK",
                });
              }
            }
          } catch (err: any) {
          }
        }
      } else if (result.isDismissed) {
      }
    });
  }

  function validateLicensePlate(
    licensePlate: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (licensePlate.length == 0) {
      showError("licensePlateError", "License Plate is required");
      showIcon("licensePlateState", false);
      return false;
    }
    showError("licensePlateError", "");
    showIcon("licensePlateState", true);
    return true;
  }

  function validateManufacturer(
    manufacturer: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (manufacturer.length == 0) {
      showError("manufacturerError", "Manufacturer is required");
      showIcon("manufacturerState", false);
      return false;
    }
    showError("manufacturerError", "");
    showIcon("manufacturerState", true);
    return true;
  }

  function validateVersion(
    version: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (version.length == 0) {
      showError("versionError", "Version is required");
      showIcon("versionState", false);
      return false;
    }
    showError("versionError", "");
    showIcon("versionState", true);
    return true;
  }

  function validateRegistrationDate(
    registrationDate: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (registrationDate.length == 0) {
      showError("registrationDateError", "Registration date is required");
      showIcon("registrationDateState", false);
      return false;
    }
    showError("registrationDateError", "");
    showIcon("registrationDateState", true);
    return true;
  }

  function validateModel(
    model: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (model.length == 0) {
      showError("modelError", "Model is required");
      showIcon("modelState", false);
      return false;
    }
    showError("modelError", "");
    showIcon("modelState", true);
    return true;
  }

  function validateRegistrationNumber(
    registrationNumber: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (registrationNumber.length == 0) {
      showError("registrationNumberError", "Registration number is required");
      showIcon("registrationNumberState", false);
      return false;
    }
    showError("registrationNumberError", "");
    showIcon("registrationNumberState", true);
    return true;
  }

  function validateRegistrationLocation(
    registrationLocation: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (registrationLocation.length == 0) {
      showError(
        "registrationLocationError",
        "Registration location is required"
      );
      showIcon("registrationLocationState", false);
      return false;
    }
    showError("registrationLocationError", "");
    showIcon("registrationLocationState", true);
    return true;
  }

  function validatePurpose(
    purpose: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (purpose.length == 0) {
      showError("purposeError", "Purpose is required");
      showIcon("purposeState", false);
      return false;
    }
    showError("purposeError", "");
    showIcon("purposeState", true);
    return true;
  }

  function validateOwnerType(
    ownerType: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (ownerType.length == 0) {
      showError("ownerTypeError", "Owner type is required");
      showIcon("ownerTypeState", false);
      return false;
    }
    showError("ownerTypeError", "");
    showIcon("ownerTypeState", true);
    return true;
  }

  function validateVehicleType(
    vehicleType: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (vehicleType.length == 0) {
      showError("vehicleTypeError", "Vehicle type is required");
      showIcon("vehicleTypeState", false);
      return false;
    }
    showError("vehicleTypeError", "");
    showIcon("vehicleTypeState", true);
    return true;
  }

  function validateVin(
    vin: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (vin.length == 0) {
      showError("vinError", "Vin is required");
      showIcon("vinState", false);
      return false;
    }
    showError("vinError", "");
    showIcon("vinState", true);
    return true;
  }

  function validateWidth(
    width: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (width.length == 0) {
      showError("widthError", "Width is required");
      showIcon("widthState", false);
      return false;
    } else if (Number.isNaN(Number(width))) {
      showError("widthError", "Width must be a number");
      showIcon("widthState", false);
      return false;
    } else if (Number(width) <= 0) {
      showError("widthError", "Width must be greater than 0");
      showIcon("widthState", false);
      return false;
    }
    showError("widthError", "");
    showIcon("widthState", true);
    return true;
  }

  function validateLength(
    length: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (length.length == 0) {
      showError("lengthError", "Length is required");
      showIcon("lengthState", false);
      return false;
    } else if (
      Number.isNaN(Number(length)) 
    ) {
      showError("lengthError", "Length must be a integer number");
      showIcon("lengthState", false);
      return false;
    }
    else if (Number(length) <= 0) {
      showError("lengthError", "Length must be greater than 0");
      showIcon("lengthState", false);
      return false;
    }
    showError("lengthError", "");
    showIcon("lengthState", true);
    return true;
  }

  function validateWheelBase(
    wheelBase: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (wheelBase.length == 0) {
      showError("wheelBaseError", "Wheel base is required");
      showIcon("wheelBaseState", false);
      return false;
    } else if (Number.isNaN(Number(wheelBase))) {
      showError("wheelBaseError", "Wheel base must be a number");
      showIcon("wheelBaseState", false);
      return false;
    }
    else if (Number(wheelBase) <= 0) {
      showError("wheelBaseError", "Wheel base must be greater than 0");
      showIcon("wheelBaseState", false);
      return false;
    }
    showError("wheelBaseError", "");
    showIcon("wheelBaseState", true);
    return true;
  }

  function validateEmission(
    emission: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (emission.length == 0) {
      showError("emissionError", "Emission is required");
      showIcon("emissionState", false);
      return false;
    } else if (Number.isNaN(Number(emission))) {
      showError("emissionError", "Emission base must be a number");
      showIcon("emissionState", false);
      return false;
    }
    else if (Number(emission) <= 0) {
      showError("emissionError", "Emission must be greater than 0");
      showIcon("emissionState", false);
      return false;
    }
    showError("emissionError", "");
    showIcon("emissionState", true);
    return true;
  }

  function validateMileage(
    mileage: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (mileage.length == 0) {
      showError("mileageError", "Mileage is required");
      showIcon("mileageState", false);
      return false;
    } else if (Number.isNaN(Number(mileage))) {
      showError("mileageError", "Mileage base must be a number");
      showIcon("mileageState", false);
      return false;
    }
    else if (Number(mileage) <= 0) {
      showError("mileageError", "Mileage must be greater than 0");
      showIcon("mileageState", false);
      return false;
    }
    showError("mileageError", "");
    showIcon("mileageState", true);
    return true;
  }

  function validateVehicleOwnerCid(
    vehicleOwnerCid: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (vehicleOwnerCid.length == 0) {
      showError("vehicleOwnerCidError", "Vehicle owner CID is required");
      showIcon("vehicleOwnerCidState", false);
      return false;
    } else if (
      Number.isNaN(Number(vehicleOwnerCid)) ||
      parseFloat(vehicleOwnerCid) < 0 ||
      !Number.isInteger(Number(vehicleOwnerCid))
    ) {
      showError("vehicleOwnerCidError", "Cid must be a integer number");
      showIcon("vehicleOwnerCidState", false);
      return false;
    }
    showError("vehicleOwnerCidError", "");
    showIcon("vehicleOwnerCidState", true);
    return true;
  }

  function validateName(
    name: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (name.length == 0) {
      showError("ownerNameError", "Owner name is required");
      showIcon("ownerNameState", false);
      return false;
    }
    showError("ownerNameError", "");
    showIcon("ownerNameState", true);
    return true;
  }

  function validateOwnerDob(
    ownerDob: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (ownerDob.length == 0) {
      showError("dateOfBirthError", "Date of birth is required");
      showIcon("dateOfBirthState", false);
      return false;
    }
    showError("dateOfBirthError", "");
    showIcon("dateOfBirthState", true);
    return true;
  }

  function validatePhoneNumber(
    ownerPhoneNumber: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (ownerPhoneNumber.length == 0) {
      showError("ownerPhoneNumberError", "Phone number is required");
      showIcon("ownerPhoneNumberState", false);
      return false;
    } else if (Number.isNaN(Number(ownerPhoneNumber))) {
      showError("ownerPhoneNumberError", "Phone number must be a number");
      showIcon("ownerPhoneNumberState", false);
      return false;
    }
    else if (Number(ownerPhoneNumber) <= 0) {
      showError("ownerPhoneNumberError", "Phone number can't be a negative number");
      showIcon("ownerPhoneNumberState", false);
      return false;
    }
    showError("ownerPhoneNumberError", "");
    showIcon("ownerPhoneNumberState", true);
    return true;
  }

  function validateAddress(
    address: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (fieldName: string, state: boolean) => void
  ) {
    if (address.length == 0) {
      showError("ownerAddressError", "Address is required");
      showIcon("ownerAddressState", false);
      return false;
    }
    showError("ownerAddressError", "");
    showIcon("ownerAddressState", true);
    return true;
  }
  return { submitCertificate };
};
