import axiosInstance from "../../utils/axios";
import { postAPI } from "../../api/postAPI";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  setDepLoginState,
  setDepProfile,
  setCenterProfile,
  clearState,
} from "../slices/accountSlice";
import { RootState, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { loadingHook } from "./loadingHooks";

export const accountHook = () => {
  const { loading, setLoadingState } = loadingHook();
  const dispatch = useDispatch();
  const isDepLogin = useAppSelector(
    (state: RootState) => state.isDepLogin.isDepLogin
  );
  const depProfile = useAppSelector(
    (state: RootState) => state.isDepLogin.depProfile
  );
  const centerProfile = useAppSelector(
    (state: RootState) => state.isDepLogin.centerProfile
  );
  const depIdError = "Department does not exist";
  const centerIdError = "Center does not exist";
  const passwordError = "Wrong password";
  const navigate = useNavigate();

  function setDepLogin(depLoginState: boolean) {
    dispatch(setDepLoginState(depLoginState));
  }

  async function getProfile() {
    try {
      const res = await axiosInstance.get(
        `registration-${isDepLogin ? "dep" : "center"}/profile`
      );
      if (res.status === 200) {
        if (isDepLogin) {
          dispatch(setDepProfile(res.data));
        } else {
          dispatch(setCenterProfile(res.data));
        }
      }
    } catch (err) {}
  }

  async function updateProfile(data: any) {
    setLoadingState(true);
    try {
      const res = await axiosInstance.post(
        `registration-${isDepLogin ? "dep" : "center"}/profile`,
        data
      );
      if (res.status === 200) {
        if (isDepLogin) {
          dispatch(setDepProfile(res.data));
        } else {
          dispatch(setCenterProfile(res.data));
        }
      }
    } catch (err) {
    } finally {
      setLoadingState(false);
    }
  }

  async function depLogin({
    loginData,
    showError,
  }: {
    loginData: {};
    showError: (fieldName: string, errorMessage: string) => void;
  }) {
    try {
      const res = await axiosInstance.post(
        postAPI().registrationDepLogin,
        loginData
      );
      if (res.status === 200) {
        setDepLogin(true);
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        await getProfile();
        navigate("/landing-page");
      }
    } catch (err: any) {
      if (err.response.data.message === centerIdError) {
        showError("IdError", centerIdError);
      } else if (err.response.data.message === passwordError) {
        showError("passwordError", passwordError);
      } else {
        showError("IdError", depIdError);
      }
    }
  }
  async function centerLogin({
    loginData,
    showError,
  }: {
    loginData: {};
    showError: (fieldName: string, errorMessage: string) => void;
  }) {
    try {
      const res = await axiosInstance.post(
        postAPI().registrationCenterLogin,
        loginData
      );
      if (res.status === 200) {
        setDepLogin(false);
        const token = res.data.access_token;
        localStorage.setItem("token", token);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        await getProfile();
        navigate("/landing-page");
      }
    } catch (err: any) {
      if (err.response.data.message === depIdError) {
        showError("IdError", depIdError);
      } else if (err.response.data.message === passwordError) {
        showError("passwordError", passwordError);
      } else {
        showError("IdError", centerIdError);
      }
    }
  }

  function validateCenterId(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    if (signUpData.centerId.length == 0) {
      showError("centerIdError", "Center ID is required");
      showIcon("centerIdState", false);
      return false;
    } else if (signUpData.centerId.length != 6) {
      showError("centerIdError", "Center ID must be 6 characters");
      showIcon("centerIdState", false);
      return false;
    } else {
      showError("centerIdError", "");
      return true;
    }
  }
  function validateName(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    if (signUpData.name.length == 0) {
      showError("centerNameError", "Center name is required");
      showIcon("centerNameState", false);
      return false;
    } else if (signUpData.name.length < 6) {
      showError(
        "centerNameError",
        "Center name must be greater than 6 characters"
      );
      showIcon("centerNameState", false);
      return false;
    } else {
      showError("centerNameError", "");
      showIcon("centerNameState", true);
      return true;
    }
  }
  function validateProvinceCode(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      provinceCode: number;
      districtCode: number;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    if (signUpData.provinceCode == 0) {
      showError("provinceCodeError", "Province is required");
      showIcon("provinceCodeState", false);
      return false;
    } else {
      showError("provinceCodeError", "");
      showIcon("provinceCodeState", true);
      return true;
    }
  }
  function validateDistrictCode(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      provinceCode: number;
      districtCode: number;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    if (signUpData.districtCode == 0) {
      showError("districtCodeError", "District is required");
      showIcon("districtCodeState", false);
      return false;
    } else {
      showError("districtCodeError", "");
      showIcon("districtCodeState", true);
      return true;
    }
  }
  function validateLocation(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    if (signUpData.location.length == 0) {
      showError("centerLocationError", "Center location is required");
      showIcon("centerLocationState", false);
      return false;
    } else {
      showError("centerLocationError", "");
      showIcon("centerLocationState", true);
      return true;
    }
  }
  function validateRePassword(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      location: string;
      phoneNumber: string;
    },
    repassword: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    if (repassword.length == 0) {
      showIcon("repasswordState", false);
      showError("repasswordError", "Re-enter password is required");
      return false;
    } else if (repassword !== signUpData.password) {
      showError("repasswordError", "Repassword is not match");
      showIcon("repasswordState", false);
      return false;
    } else {
      showError("repasswordError", "");
      showIcon("repasswordState", true);
      return true;
    }
  }

  function validatePassword(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    let minNumberofChars = 8;
    let regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,1000}$/;
    if (signUpData.password.length < minNumberofChars) {
      showError("passwordError", "Password must be more than 8 character");
      showIcon("passwordState", false);
      return false;
    } else if (!regularExpression.test(signUpData.password)) {
      showError(
        "passwordError",
        "Password need one number and one special character"
      );
      showIcon("passwordState", false);
      return false;
    } else {
      showError("passwordError", "");
      showIcon("passwordState", true);
      return true;
    }
  }

  function validatePhoneNumber(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      location: string;
      phoneNumber: string;
    },
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    let regularExpression =
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (signUpData.phoneNumber.match(regularExpression)) {
      showError("phoneNumberError", "");
      showIcon("phoneNumberState", true);
      return true;
    } else {
      showError("phoneNumberError", "Wrong phone number format");
      showIcon("phoneNumberState", false);
      return false;
    }
  }
  async function createRegistrationCenter(
    signUpData: {
      centerId: string;
      password: string;
      name: string;
      provinceCode: number;
      districtCode: number;
      location: string;
      phoneNumber: string;
    },
    repassword: string,
    showError: (errorField: string, errorMessage: string) => void,
    showIcon: (errorField: string, state: boolean) => void
  ) {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure to create a new registration center ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        validatePassword(signUpData, showError, showIcon);
        validateRePassword(signUpData, repassword, showError, showIcon);
        validateName(signUpData, showError, showIcon);
        validateProvinceCode(signUpData, showError, showIcon);
        validateDistrictCode(signUpData, showError, showIcon);
        validateLocation(signUpData, showError, showIcon);
        validatePhoneNumber(signUpData, showError, showIcon);
        if (
          validateCenterId(signUpData, showError, showIcon) &&
          validatePassword(signUpData, showError, showIcon) &&
          validateRePassword(signUpData, repassword, showError, showIcon) &&
          validateName(signUpData, showError, showIcon) &&
          validateProvinceCode(signUpData, showError, showIcon) &&
          validateDistrictCode(signUpData, showError, showIcon) &&
          validateLocation(signUpData, showError, showIcon) &&
          validatePhoneNumber(signUpData, showError, showIcon)
        ) {
          try {
            const depId = depProfile._id;
            const res = await axiosInstance.post(
              postAPI().createRegistrationCenter,
              {
                ...signUpData,
                registrationDep: depId,
              }
            );
            if (res.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "The operation was successful!",
                confirmButtonText: "OK",
              });
            }
          } catch (err: any) {
            showError("centerIdError", "center ID already exist");
            showIcon("centerIdState", false);
          }
        }
      } else if (result.isDismissed) {
      }
    });
  }

  function clearAllData() {
    dispatch(clearState());
  }

  return {
    isDepLogin,
    depProfile,
    centerProfile,
    getProfile,
    updateProfile,
    setDepLogin,
    depLogin,
    centerLogin,
    createRegistrationCenter,
    clearAllData,
  };
};
