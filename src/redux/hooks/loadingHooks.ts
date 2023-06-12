import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useAppSelector, RootState } from "../store";
import {
  setLoading,
  setDate,
  setType,
  setLocation,
  setDistrictCode,
  setProvinceCode,
} from "../slices/loadingSlice";

export const loadingHook = () => {
  const dispatch = useDispatch();
  const loading = useAppSelector((state: RootState) => state.loading.loading);
  const date = useAppSelector((state: RootState) => state.loading.date);
  const type = useAppSelector((state: RootState) => state.loading.type);
  const location = useAppSelector((state: RootState) => state.loading.location);
  const provinceCode = useAppSelector(
    (state: RootState) => state.loading.provinceCode
  );
  const districtCode = useAppSelector(
    (state: RootState) => state.loading.districtCode
  );
  function setLoadingState(loading: boolean) {
    dispatch(setLoading(loading));
  }
  function setDateState(date: [string, string]) {
    dispatch(setDate(date));
  }
  function setTypeState(type: string) {
    dispatch(setType(type));
  }
  function setLocationState(location: string) {
    dispatch(setLocation(location));
  }
  function setProvinceCodeState(code: number) {
    dispatch(setProvinceCode(code));
  }
  function setDistrictCodeState(code: number) {
    dispatch(setDistrictCode(code));
  }
  return {
    loading,
    date,
    type,
    location,
    provinceCode,
    districtCode,
    setLoadingState,
    setDateState,
    setTypeState,
    setLocationState,
    setDistrictCodeState,
    setProvinceCodeState,
  };
};
