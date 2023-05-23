import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useAppSelector, RootState } from "../store";
import { setLoading } from "../slices/loadingSlice";

export const loadingHook = () => {
  const dispatch = useDispatch();

  const loading = useAppSelector((state: RootState) => state.loading.loading);
  function setLoadingState(loading: boolean) {
    dispatch(setLoading(loading));
  }
  return {
    loading,
    setLoadingState,
  };
};
