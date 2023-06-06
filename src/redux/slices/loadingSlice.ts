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
  },
});

export const { setLoading, setDate, setType } = loadingSlide.actions;

export default loadingSlide.reducer;
