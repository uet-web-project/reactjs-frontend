import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setLoading } from "../slices/loadingSlice";
import axiosInstance from "../../utils/axios";
import { postAPI } from "../../api/postAPI";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const fileImportHooks = () => {
  const dispatch = useDispatch();

  async function uploadFile(file: FormData) {
    dispatch(setLoading(true));
    // console.log(file);

    try {
      const res = await axiosInstance.post(postAPI().fileImport, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err: any) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { uploadFile };
};
