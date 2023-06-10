import React, { useEffect, useState } from "react";
import "./styles.css";
import CenterInformation from "../center-information/CenterInformation";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import ProfileScreen from "../../screens/profile-screen";
import { IRegistrationCenter } from "../../interfaces/registrationCenter.interface";
import { useDispatch } from "react-redux";
import {
  setCenterProfile,
  clearCenterProfile,
} from "../../redux/slices/accountSlice";

function CenterList() {
  const dispatch = useDispatch();
  const { centerList, getCenterListData } = chartStatisticHook();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onClose = () => {
    toggleOpen();
    dispatch(clearCenterProfile());
  };

  const handleClick = (selectedCenter: IRegistrationCenter) => {
    dispatch(setCenterProfile(selectedCenter));
    toggleOpen();
  };

  useEffect(() => {
    getCenterListData();
  }, []);
  return (
    <div className="center-list-container">
      <ProfileScreen open={open} onClose={onClose} showCenterInfo />
      <div className="secondary-font center-list-header text-base text-gray-700 font-medium">
        Centers under this department
      </div>
      <div className="center-list-information-header"></div>
      {centerList.length
        ? centerList.map((centerData, index) => (
            <CenterInformation
              onClick={() => handleClick(centerData)}
              key={index}
              centerData={centerData}
              index={index + 1}
            />
          ))
        : "No center under this department"}
    </div>
  );
}

export default CenterList;
