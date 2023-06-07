import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useAppSelector, RootState } from "../store";
import { setLoading } from "../slices/loadingSlice";
import axiosInstance from "../../utils/axios";
import { postAPI } from "../../api/postAPI";
import { FileWithPath } from "react-dropzone";

export const fileImportHooks = () => {
  const loading = useAppSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();

  async function uploadFile(file:FormData) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(postAPI().fileImport, file,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return {  uploadFile };
};
