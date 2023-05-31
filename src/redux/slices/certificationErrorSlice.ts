import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// check whether user log in as department or center
export interface IcertificationError {
  licensePlateError: boolean;
  manufacturerError: boolean;
  versionError: boolean;
  modelError: boolean;
  registrationNumberError: boolean;
  registrationDateError: boolean;
  registrationLocationError: boolean;
  vehicleTypeError: boolean;
  purposeError: boolean;
  vinError: boolean;
  widthError: boolean;
  lengthError: boolean;
  wheelBaseError: boolean;
  emissionError: boolean;
  mileageError: boolean;
  vehicleOwnerCidError: boolean;
  ownerNameError: boolean;
  ownerTypeError: boolean;
  ownerPhoneNumberError: boolean;
  ownerDobErrorError: boolean;
  ownerAddressError: boolean;
}
const initialState = {
  certificattionError: {
    licensePlateError: false,
    manufacturerError: false,
    versionError: false,
    modelError: false,
    registrationNumberError: false,
    registrationDateError: false,
    registrationLocationError: false,
    vehicleTypeError: false,
    purposeError: false,
    vinError: false,
    widthError: false,
    lengthError: false,
    wheelBaseError: false,
    emissionError: false,
    mileageError: false,
    vehicleOwnerCidError: false,
    ownerNameError: false,
    ownerTypeError: false,
    ownerPhoneNumberError: false,
    ownerDobErrorError: false,
    ownerAddressError: false,
  },
};
export const certificationErrorSlice = createSlice({
  name: "certificationError",
  initialState,
  reducers: {
    changeCertificationError(state, action: PayloadAction<IcertificationError>) {
      state.certificattionError = action.payload;
    },
  },
});

export const { changeCertificationError } = certificationErrorSlice.actions;

export default certificationErrorSlice.reducer;
