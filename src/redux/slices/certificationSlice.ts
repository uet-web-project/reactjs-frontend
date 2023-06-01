import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// check whether user log in as department or center
export interface IcertificationState {
  licensePlate: string;
  manufacturer: string;
  version: string;
  model: string;
  registrationNumber: string;
  registrationDate: Date;
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
  ownerDob: Date;
  ownerAddress: string;
}
const initialState = {
  certificateInformation: {
    licensePlate: "",
    manufacturer: "",
    version: "",
    model: "",
    registrationNumber: "",
    registrationDate: new Date(),
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
    ownerDob: new Date(),
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
