import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// check whether user log in as department or center
const initialState = {
    step: 0,
  };
  export const certificationStepSlice = createSlice({
    name: "step",
    initialState,
    reducers: {
      setCertificationStep(state, action: PayloadAction<number>) {
        state.step = action.payload;
      },
    },
  });
  
  export const { setCertificationStep } = certificationStepSlice.actions;
  
  export default certificationStepSlice.reducer;