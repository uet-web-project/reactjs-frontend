import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// check whether user log in as department or center
export interface IcertificationState {
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
  ownerType: string;
  ownerPhoneNumber: string;
  ownerDob: string;
  ownerAddress: string;
}
const initialState = {
  certificateInformation: {
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
  },
};
export const certificationSlice = createSlice({
  name: "certification",
  initialState,
  reducers: {
    changeInformation(state, action: PayloadAction<IcertificationState>) {
      state.certificateInformation = action.payload;
    },
  },
});

export const { changeInformation } = certificationSlice.actions;

export default certificationSlice.reducer;
