import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import addMonths from "date-fns/addMonths";
import startOfMonth from "date-fns/startOfMonth";

const today = new Date();
const pastMonthStart = startOfMonth(addMonths(today, 0));

const initialState = {
  loading: false,
  date: [
    pastMonthStart.toISOString().split("T")[0],
    today.toISOString().split("T")[0],
  ] as [string, string],
  type: "all",
  location: "car",
  provinceCode: 0,
  districtCode: 0,
};
export const loadingSlide = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDate(state, action: PayloadAction<[string, string]>) {
      state.date = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setProvinceCode(state, action: PayloadAction<number>) {
      state.provinceCode = action.payload;
    },
    setDistrictCode(state, action: PayloadAction<number>) {
      state.districtCode = action.payload;
    },
  },
});

export const {
  setLoading,
  setDate,
  setType,
  setLocation,
  setDistrictCode,
  setProvinceCode,
} = loadingSlide.actions;

export default loadingSlide.reducer;
