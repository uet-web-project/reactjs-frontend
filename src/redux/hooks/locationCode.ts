import { useAppSelector, RootState } from "../store";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { setLoading } from "../slices/loadingSlice";
import { postalCode, setDataForPostalCode } from "../slices/postalCode";
import { getAPI } from "../../api/getAPI";

export const locationHook = () => {
  const dispatch = useDispatch();

  const { locationCode } = useAppSelector(
    (state: RootState) => state.locationCode
  );

  async function getLocationCode() {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.get(getAPI().locationCode);
      if (res.status === 200) {
        const moddedData: postalCode[] = res.data;
        dispatch(setDataForPostalCode(moddedData));
        console.log(moddedData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    getLocationCode,
    locationCode,
  };
};
