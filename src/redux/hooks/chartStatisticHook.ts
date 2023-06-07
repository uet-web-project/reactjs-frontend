import { ICarTypeOverviewChart } from "./../slices/chartsSlice";
import {
  setDataForCarInfoOverviewTable,
  setDataForCarTypeOverview,
  setDataForMonthlyComparison,
  setDataForCenterList,
  setDataForTotalOverviewChart,
  setDataForCarChart,
  setDataForCarPieChart,
  clearAllData,
} from "../slices/chartsSlice";
import { ICarInfoOverviewTable } from "../slices/chartsSlice";
import { IVehicle } from "../../interfaces/vehicle.interface";
import { useAppSelector, RootState } from "../store";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { getAPI } from "../../api/getAPI";
import { IMonthlyComparison } from "../slices/chartsSlice";
import { setLoading } from "../slices/loadingSlice";
import { postAPI } from "../../api/postAPI";
import { useEffect, useState } from "react";
import startOfMonth from "date-fns/startOfMonth";
import addMonths from "date-fns/addMonths";

export const chartStatisticHook = () => {
  const dispatch = useDispatch();

  const {
    totalOverviewChartData,
    carTypeOverviewChart,
    carRegisteredMonthlyComparison,
    carInfoOverviewTable,
    centerList,
    carStatsForChart,
    carPieChart,
  } = useAppSelector((state: RootState) => state.chartStatistic);

  const { type, date, location } = useAppSelector(
    (state: RootState) => state.loading
  );

  function callClearAllData() {
    dispatch(clearAllData());
  }
  async function getDataForTotalOverviewChart(date: string) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(
        date == "week"
          ? getAPI().getWeekDataForTotalOverviewChart
          : date == "month"
          ? getAPI().getMonthDataForTotalOverviewChart
          : getAPI().getYearDataForTotalOverviewChart
      );
      if (res.status === 200) {
        dispatch(setDataForTotalOverviewChart(res.data));
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getDataForMonthlyComparison() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(
        getAPI().getYearDataForTotalOverviewChart
      );
      if (res.status === 200) {
        // get month name
        const current = new Date();
        const currentMonth = current.toLocaleString("default", {
          month: "long",
        });
        current.setMonth(current.getMonth() - 1);
        const previousMonth = current.toLocaleString("default", {
          month: "long",
        });

        // get number of registered vehicles by month
        const resData = res.data;
        const monthRegistered = resData[new Date().getMonth()].vehicles;
        const lastMonthRegistered = resData[new Date().getMonth() - 1].vehicles;

        const pieData: IMonthlyComparison[] = [
          {
            name: previousMonth,
            value: lastMonthRegistered,
          },
          {
            name: currentMonth,
            value: monthRegistered,
          },
        ];
        dispatch(setDataForMonthlyComparison(pieData));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getVehicleTableData() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(getAPI().getAllVehicles);
      if (res.status === 200) {
        const moddedData: ICarInfoOverviewTable[] = res.data.map(
          (item: IVehicle) => ({
            ...item,
            id: item._id,
          })
        );
        dispatch(setDataForCarInfoOverviewTable(moddedData));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getCenterListData() {
    dispatch(setLoading(true));
    try {
      const depProfile = await axiosInstance.get(getAPI().getDepProfile);
      const depId = depProfile.data._id;
      if (depId && depProfile.status === 200) {
        const res = await axiosInstance.get(
          getAPI("", depId).getCenterListById
        );
        console.log(res);
        if (res.status === 200) {
          dispatch(setDataForCenterList(res.data));
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getDataForCarTypeOverview(date: string) {
    dispatch(setLoading(true));
    try {
      const monthDataForCarTypeOverview = await axiosInstance.get(
        date === "week"
          ? getAPI().getWeekDataForCarTypeOverview
          : date == "month"
          ? getAPI().getMonthDataForCarTypeOverview
          : getAPI().getYearDataForCarTypeOverview
      );
      if (monthDataForCarTypeOverview.status === 200) {
        console.log(monthDataForCarTypeOverview);
        dispatch(setDataForCarTypeOverview(monthDataForCarTypeOverview.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  //const

  async function getChartDataOfRegisteredCar(
    date: [string, string],
    type = "all"
  ) {
    dispatch(setLoading(true));
    try {
      const startDate = date[0];
      const endDate = date[1];
      let requestedData;
      if (location === "car") {
        requestedData =
          type === "all"
            ? {
                startDate: startDate,
                endDate: endDate,
              }
            : {
                vehicleType: type,
                startDate: startDate,
                endDate: endDate,
              };
      } else {
        requestedData =
          type === "all"
            ? {
                startDate: startDate,
                endDate: endDate,
              }
            : {
                vehicleType: type,
                startDate: startDate,
                endDate: endDate,
              };
      }
      const chartData = await axiosInstance.post(
        postAPI().registeredCarData,
        requestedData
      );
      if (chartData.status === 200) {
        console.log(chartData.data);
        dispatch(setDataForCarChart(chartData.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function getDataForCarPieChart() {
    dispatch(setLoading(true));
    try {
      const startDate = date[0];
      const endDate = date[1];
      const requestedData =
        location === "car"
          ? {
              filterType: "filter-by-date-range",
              startDate: startDate,
              endDate: endDate,
            }
          : {
              filterType: "filter-by-date-range",
              startDate: startDate,
              endDate: endDate,
            };

      const chartData = await axiosInstance.post(
        postAPI().allRegisteredCarData,
        requestedData
      );
      if (chartData.status === 200) {
        console.log(chartData.data);
        dispatch(setDataForCarPieChart(chartData.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  function infoChartController() {
    console.log(date);
    console.log(type);
    getChartDataOfRegisteredCar(date, type);
  }

  return {
    centerList,
    carInfoOverviewTable,
    carTypeOverviewChart,
    carRegisteredMonthlyComparison,
    totalOverviewChartData,
    carStatsForChart,
    carPieChart,
    getDataForTotalOverviewChart,
    getVehicleTableData,
    getDataForMonthlyComparison,
    getCenterListData,
    getDataForCarTypeOverview,
    getChartDataOfRegisteredCar,
    infoChartController,
    getDataForCarPieChart,
    callClearAllData,
  };
};
