import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IRegistrationDep } from "../../interfaces/registrationDep.interface";
import { IVehicle } from "../../interfaces/vehicle.interface";
import { IRegistrationCenter } from "../../interfaces/registrationCenter.interface";

// Define a type for the slice state

export interface ICarInfoTable extends IVehicle {
  id: string;
  index: number;
}

export interface tableState {
  tableInfo: ICarInfoTable[];
  
}

const initialState: tableState = {
  tableInfo:[],
};
export const tableStatisticSlice = createSlice({
  name: "tableStatistic",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDataForTableInfo(state, action: PayloadAction<ICarInfoTable[]>) {
      state.tableInfo = action.payload;
    },
  },
});

export const {
  setDataForTableInfo
} = tableStatisticSlice.actions;

export default tableStatisticSlice.reducer;
