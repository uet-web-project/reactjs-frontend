import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IRegistrationDep } from "../../interfaces/registrationDep.interface";
import { IVehicle } from "../../interfaces/vehicle.interface";
import { IRegistrationCenter } from "../../interfaces/registrationCenter.interface";

// Define a type for the slice state

interface ITotalOverviewChart {
  date: string; // date can be month or year name
  vehicles: number;
}

export interface IMonthlyComparison {
  name: string;
  value: number;
}

interface ICarTypeOverviewChart {
  carType: string;
  numberOfCar: number;
}

export interface ICarInfoOverviewTable extends IVehicle {
  id: string;
}

export interface ChartState {
  totalOverviewChartData: ITotalOverviewChart[];
  carTypeOverviewChart: ICarTypeOverviewChart[];
  carRegisteredMonthlyComparison: IMonthlyComparison[];
  carInfoOverviewTable: ICarInfoOverviewTable[];
  centerList: IRegistrationCenter[];
  loading: boolean;
}

const initialState: ChartState = {
  totalOverviewChartData: [],
  carTypeOverviewChart: [],
  carRegisteredMonthlyComparison: [],
  carInfoOverviewTable: [],
  centerList: [],
  loading: false,
};
export const chartStatisticSlice = createSlice({
  name: "chartStatistic",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDataForTotalOverviewChart(
      state,
      action: PayloadAction<ITotalOverviewChart[]>
    ) {
      state.totalOverviewChartData = action.payload;
    },
    setDataForCarTypeOverview(
      state,
      action: PayloadAction<ICarTypeOverviewChart[]>
    ) {
      state.carTypeOverviewChart = action.payload;
    },
    setDataForMonthlyComparison(state, action: PayloadAction<IMonthlyComparison[]>) {
      state.carRegisteredMonthlyComparison = action.payload
    },
    setDataForCarInfoOverviewTable(
      state,
      action: PayloadAction<ICarInfoOverviewTable[]>
    ) {
      state.carInfoOverviewTable = action.payload;
    },
    setDataForCenterList(state, action: PayloadAction<IRegistrationCenter[]>) {
      state.centerList = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setDataForTotalOverviewChart,
  setDataForCarInfoOverviewTable,
  setDataForMonthlyComparison,
  setDataForCenterList,
  setLoading,
  setDataForCarTypeOverview,
} = chartStatisticSlice.actions;

export default chartStatisticSlice.reducer;
