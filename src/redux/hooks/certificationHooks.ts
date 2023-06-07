import { useDispatch } from "react-redux";
import { useAppSelector, RootState } from "../store";
import {
  IcertificationState,
  changeInformation,
} from "../slices/certificationSlice";

export const certificationHook = () => {
  const dispatch = useDispatch();
  const certificateInformation = useAppSelector(
    (state: RootState) => state.certification.certificateInformation
  );
  function setCertificateInformation(
    certificateInformation: IcertificationState
  ) {
    dispatch(changeInformation(certificateInformation));
  }
  function clearFormData() {
    setCertificateInformation({
      licensePlate: "",
      manufacturer: "",
      version: "",
      model: "",
      registrationNumber: "",
      registrationDate: new Date().toISOString(),
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
      ownerDob: new Date().toISOString(),
      ownerAddress: "",
    });
  }
  return { certificateInformation, setCertificateInformation, clearFormData };
};
