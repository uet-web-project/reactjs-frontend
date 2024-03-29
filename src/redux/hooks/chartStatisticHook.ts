import { ICarTypeOverviewChart, infoChart } from "./../slices/chartsSlice";
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
import { accountHook } from "./accountHooks";
import { loadingHook } from "./loadingHooks";
import {
  ICarInfoTable,
  setDataForTableInfo,
  tableState,
} from "../slices/tablesSlice";

export const chartStatisticHook = () => {
  const dispatch = useDispatch();

  const { location, districtCode, provinceCode, date, type } = loadingHook();
  const { tableInfo } = useAppSelector(
    (state: RootState) => state.tableStatistic
  );
  const { isDepLogin, depProfile } = accountHook();
  const {
    totalOverviewChartData,
    carTypeOverviewChart,
    carRegisteredMonthlyComparison,
    carInfoOverviewTable,
    centerList,
    carStatsForChart,
    carPieChart,
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
    } catch (err) {
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
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getVehicleTableData() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(
        isDepLogin
          ? getAPI().getAllVehicleByDep
          : getAPI().getAllVehicleByCenter
      );

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
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getCenterListData() {
    dispatch(setLoading(true));
    const depId = depProfile._id;
    try {
      const res = await axiosInstance.get(getAPI("", depId).getCenterListById);
      if (res.status === 200) {
        dispatch(setDataForCenterList(res.data));
      }
    } catch (err) {
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getDataForCarTypeOverview(date: string) {
    dispatch(setLoading(true));
    try {
      const monthDataForCarTypeOverview = await axiosInstance.post(
        postAPI().getDataForCarTypeOverview,
        {
          filterType: `filter-by-${date}`,
        }
      );
      if (monthDataForCarTypeOverview.status === 200) {
        dispatch(setDataForCarTypeOverview(monthDataForCarTypeOverview.data));
      }
    } catch (err) {
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getChartDataOfCar(date: [string, string], type = "all") {
    dispatch(setLoading(true));
    try {
      const startDate = date[0];
      const endDate = date[1];
      const districtCodeRequest: null | number =
        districtCode === 0 ? null : districtCode;
      let requestedData;
      if (location === "car") {
        requestedData =
          type === "all"
            ? {
                provinceCode: provinceCode,
                districtCode: districtCodeRequest,
                getNearExpired: false,
                startDate: startDate,
                endDate: endDate,
              }
            : {
                provinceCode: provinceCode,
                districtCode: districtCodeRequest,
                getNearExpired: false,
                vehicleType: type,
                startDate: startDate,
                endDate: endDate,
              };
      } else {
        requestedData =
          type === "all"
            ? {
                provinceCode: provinceCode,
                districtCode: districtCodeRequest,
                getNearExpired: true,
                startDate: startDate,
                endDate: endDate,
              }
            : {
                provinceCode: provinceCode,
                districtCode: districtCodeRequest,
                getNearExpired: true,
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
        const newStartDateNumber = new Date(startDate).getTime();
        const newEndDateNumber = new Date(endDate).getTime();
        // get number of days between 2 variables
        const timeDifference =
          (newEndDateNumber - newStartDateNumber) / (1000 * 60 * 60 * 24);

        if (timeDifference < 90) {
          const tempData: infoChart[] = [];
          let prevDate = null;
          let prevIndex = -1;
          for (let i = 0; i < chartData.data.length; i++) {
            const currentDate = chartData.data[i].date;
            if (currentDate === prevDate) {
              tempData[prevIndex].vehicles++;
            } else {
              tempData.push({ ...chartData.data[i] });
              prevIndex++;
            }
            prevDate = currentDate;
          }
          dispatch(setDataForCarChart(tempData));
        } else dispatch(setDataForCarChart(chartData.data));
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
      const districtCodeRequest: null | number =
        districtCode === 0 ? null : districtCode;
      const startDate = date[0];
      const endDate = date[1];
      const requestedData =
        location === "car"
          ? {
              provinceCode: provinceCode,
              districtCode: districtCodeRequest,
              filterType: "filter-by-date-range",
              getNearExpired: false,
              startDate: startDate,
              endDate: endDate,
            }
          : {
              provinceCode: provinceCode,
              districtCode: districtCodeRequest,
              filterType: "filter-by-date-range",
              getNearExpired: true,
              startDate: startDate,
              endDate: endDate,
            };

      const chartData = await axiosInstance.post(
        postAPI().allRegisteredCarData,
        requestedData
      );
      if (chartData.status === 200) {
        dispatch(setDataForCarPieChart(chartData.data));
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getDataForDetailedTable() {
    dispatch(setLoading(true));
    const depId = depProfile._id;
    let reqUrl = "";
    if (location === "car" || location === "nearExpired") {
      reqUrl = postAPI().getVehicleByFilter;
    } else if (location === "center") {
      reqUrl = getAPI("", depId).getCenterListById;
    }
    try {
      const res =
        location === "center"
          ? await axiosInstance.get(reqUrl)
          : await axiosInstance.post(reqUrl, {
              vehicleType: type === "all" ? null : type,
              getNearExpired: location === "nearExpired" ? true : false,
              startDate: date[0],
              endDate: date[1],
              provinceCode,
              districtCode,
            });

      if (res.status === 200) {
        const moddedData: ICarInfoTable[] = res.data.map(
          (item: IVehicle, index: number) => ({
            ...item,
            id: item._id,
            index: index + 1,
          })
        );
        dispatch(setDataForTableInfo(moddedData));
      }
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(setLoading(false));
    }
  }

  function infoChartController() {
    getChartDataOfCar(date, type);
    getDataForCarPieChart();
    getDataForDetailedTable();
  }

  return {
    centerList,
    carInfoOverviewTable,
    carTypeOverviewChart,
    carRegisteredMonthlyComparison,
    totalOverviewChartData,
    carStatsForChart,
    carPieChart,
    tableInfo,
    getDataForTotalOverviewChart,
    getVehicleTableData,
    getDataForMonthlyComparison,
    getCenterListData,
    getDataForCarTypeOverview,
    getChartDataOfCar,
    infoChartController,
    getDataForCarPieChart,
    callClearAllData,
    getDataForDetailedTable,
  };
};
