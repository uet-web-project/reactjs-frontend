import { useDispatch } from "react-redux";
import { useAppSelector, RootState } from "../store";
import {
  IcertificationState,
  changeInformation,
} from "../slices/certificationSlice";

export const certificationHook = () => {
  const dispatch = useDispatch();
  const certificateInformation = useAppSelector(
    (state: RootState) => state.certification.certificateInformation
  );
  function setCertificateInformation(
    certificateInformation: IcertificationState
  ) {
    dispatch(changeInformation(certificateInformation));
  }
  return { certificateInformation, setCertificateInformation };
};
