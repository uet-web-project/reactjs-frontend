import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useAppSelector, RootState } from "../store";
import { setLoading } from "../slices/loadingSlice";
import axiosInstance from "../../utils/axios";
import { postAPI } from "../../api/postAPI";
import { FileWithPath } from "react-dropzone";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const fileImportHooks = () => {
  const loading = useAppSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();

  async function uploadFile(file: FormData) {
    dispatch(setLoading(true));
    try {
      const res = await axiosInstance.post(postAPI().fileImport, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error",
        text: "There is some issue with your file!",
      });
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { uploadFile };
};
