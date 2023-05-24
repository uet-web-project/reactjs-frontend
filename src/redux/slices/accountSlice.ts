import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// check whether user log in as department or center
const initialState = {
    isDepLogin: false,
  };
  export const accountSlice = createSlice({
    name: "isDepLogin",
    initialState,
    reducers: {
      setDepLoginState(state, action: PayloadAction<boolean>) {
        state.isDepLogin = action.payload;
      },
    },
  });
  
  export const { setDepLoginState } = accountSlice.actions;
  
  export default accountSlice.reducer;