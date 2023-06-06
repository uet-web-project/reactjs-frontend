import { setDataForTableInfo } from "../slices/tablesSlice";
import { ICarInfoTable } from "../slices/tablesSlice";
import { IVehicle } from "../../interfaces/vehicle.interface";
import { useAppSelector, RootState } from "../store";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { getAPI } from "../../api/getAPI";
import { setLoading } from "../slices/loadingSlice";

export const tableStatisticHook = () => {
  const dispatch = useDispatch();

  const { tableInfo } = useAppSelector(
    (state: RootState) => state.tableStatistic
  );

  async function getCarTableData() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(getAPI().getAllVehicles);
      if (res.status === 200) {
        const moddedData: ICarInfoTable[] = res.data.map(
          (item: IVehicle, index: number) => ({
            ...item,
            id: item._id,
            index: index + 1,
          })
        );
        dispatch(setDataForTableInfo(moddedData));
        console.log("ok");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function getNearExpiredCarTableData() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(getAPI().getAllVehicles);
      if (res.status === 200) {
        const moddedData: ICarInfoTable[] = res.data.map(
          (item: IVehicle, index: number) => ({
            ...item,
            id: item._id,
            index: index + 1,
          })
        );
        dispatch(setDataForTableInfo(moddedData));
        console.log("ok");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  
  async function getCenterTableData() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(getAPI().getAllCenter);
      if (res.status === 200) {
        const moddedData: ICarInfoTable[] = res.data.map(
          (item: IVehicle, index: number) => ({
            ...item,
            id: item._id,
            index: index + 1,
          })
        );
        dispatch(setDataForTableInfo(moddedData));
        console.log("ok");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {
    getCarTableData,
    getCenterTableData,
    getNearExpiredCarTableData,
    tableInfo,
  };
};
