import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegistrationDep } from "../../interfaces/registrationDep.interface";
import { IRegistrationCenter } from "../../interfaces/registrationCenter.interface";

interface accountInterface {
  isDepLogin: boolean;
  depProfile: IRegistrationDep;
  centerProfile: IRegistrationCenter;
}

// check whether user log in as department or center
const initialState: accountInterface = {
  isDepLogin: true,
  depProfile: {
    _id: "",
    name: "",
    depId: "",
    password: "",
  },
  centerProfile: {
    _id: "",
    name: "",
    centerId: "",
    password: "",
    registrationDep: "",
    provinceCode: 0,
    districtCode: 0,
    location: "",
    phoneNumber: "",
  },
};
export const accountSlice = createSlice({
  name: "isDepLogin",
  initialState,
  reducers: {
    setDepLoginState(state, action: PayloadAction<boolean>) {
      state.isDepLogin = action.payload;
    },
    setDepProfile(state, action: PayloadAction<IRegistrationDep>) {
      state.depProfile = action.payload;
    },
    setCenterProfile(state, action: PayloadAction<IRegistrationCenter>) {
      state.centerProfile = action.payload;
    },
    clearState(state) {
      state.isDepLogin = true;
      state.depProfile = {
        _id: "",
        name: "",
        depId: "",
        password: "",
      };
      state.centerProfile = {
        _id: "",
        name: "",
        centerId: "",
        password: "",
        registrationDep: "",
        provinceCode: 0,
        districtCode: 0,
        location: "",
        phoneNumber: "",
      };
    },
    clearCenterProfile(state) {
      state.centerProfile = {
        _id: "",
        name: "",
        centerId: "",
        password: "",
        registrationDep: "",
        provinceCode: 0,
        districtCode: 0,
        location: "",
        phoneNumber: "",
      };
    },
  },
});

export const {
  setDepLoginState,
  setDepProfile,
  setCenterProfile,
  clearState,
  clearCenterProfile,
} = accountSlice.actions;

export default accountSlice.reducer;
