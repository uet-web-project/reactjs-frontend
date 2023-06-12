import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state

export interface postalCode {
  name: string;
  code: number;
  divisionType: string;
  codeName: string;
  phoneCode: number;
  districts: districtCode[];
}
interface districtCode {
  name: string;
  code: number;
  divisionType: string;
  codeName: string;
  phoneCode: number;
}
interface postalCodeState {
  locationCode: postalCode[];
}
const initialState: postalCodeState = {
  locationCode: [],
};
export const postalCodeSlice = createSlice({
  name: "postalCodeSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDataForPostalCode(state, action: PayloadAction<postalCode[]>) {
      state.locationCode = action.payload;
    },
  },
});

export const { setDataForPostalCode } = postalCodeSlice.actions;

export default postalCodeSlice.reducer;
