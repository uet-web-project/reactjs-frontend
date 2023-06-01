import { useDispatch } from "react-redux";
import { useAppSelector, RootState } from "../store";
import { setCertificationStep } from "../slices/certificationStepSlice";

export const certificationStepHook = () => {
  const dispatch = useDispatch();
  const certificationStep = useAppSelector(
    (state: RootState) => state.step.step
  );
  function setNewCertificationStep(
    step:number
  ) {
    dispatch(setCertificationStep(step));
  }
  return { certificationStep, setNewCertificationStep };
};
