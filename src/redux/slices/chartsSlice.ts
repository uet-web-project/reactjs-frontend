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

export interface ICarTypeOverviewChart {
  carType: string;
  numberOfCar: number;
}

export interface infoChart {
  vehicles: number;
  date: string;
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
  carStatsForChart: infoChart[];
  carPieChart: IMonthlyComparison[];
}

const initialState: ChartState = {
  totalOverviewChartData: [],
  carTypeOverviewChart: [],
  carRegisteredMonthlyComparison: [],
  carInfoOverviewTable: [],
  centerList: [],
  carStatsForChart: [],
  carPieChart: [],
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
    setDataForMonthlyComparison(
      state,
      action: PayloadAction<IMonthlyComparison[]>
    ) {
      state.carRegisteredMonthlyComparison = action.payload;
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
    setDataForCarChart(state, action: PayloadAction<infoChart[]>) {
      state.carStatsForChart = action.payload;
    },
    setDataForCarPieChart(state, action: PayloadAction<IMonthlyComparison[]>) {
      state.carPieChart = action.payload;
    },
    clearAllData(state) {
      state.totalOverviewChartData = [];
      state.carTypeOverviewChart = [];
      state.carRegisteredMonthlyComparison = [];
      state.carInfoOverviewTable = [];
      state.centerList = [];
      state.carPieChart = [];
      state.carStatsForChart = [];
    },
  },
});

export const {
  setDataForTotalOverviewChart,
  setDataForCarInfoOverviewTable,
  setDataForMonthlyComparison,
  setDataForCenterList,
  setDataForCarTypeOverview,
  setDataForCarChart,
  clearAllData,
  setDataForCarPieChart,
} = chartStatisticSlice.actions;

export default chartStatisticSlice.reducer;
