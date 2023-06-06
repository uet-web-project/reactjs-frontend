import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  date: [] as unknown as [string, string],
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
