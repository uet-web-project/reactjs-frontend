import {
  setDataForCarInfoOverviewTable,
  setDataForCarTypeOverview,
  setDataForMonthlyComparison,
  setDataForCenterList,
  setDataForTotalOverviewChart,
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

export const chartStatisticHook = () => {
  const dispatch = useDispatch();

  const {
    totalOverviewChartData,
    carTypeOverviewChart,
    carRegisteredMonthlyComparison,
    carInfoOverviewTable,
    centerList,
  } = useAppSelector((state: RootState) => state.chartStatistic);

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

  return {
    centerList,
    carInfoOverviewTable,
    carTypeOverviewChart,
    carRegisteredMonthlyComparison,
    totalOverviewChartData,
    getDataForTotalOverviewChart,
    getVehicleTableData,
    getDataForMonthlyComparison,
    getCenterListData,
    getDataForCarTypeOverview,
    callClearAllData,
  };
};
