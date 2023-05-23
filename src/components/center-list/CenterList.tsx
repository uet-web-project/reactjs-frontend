import React, { useEffect } from "react";
import "./styles.css";
import CenterInformation from "../center-information/CenterInformation";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";

function CenterList() {
  const { centerList, getCenterListData } = chartStatisticHook();

  useEffect(() => {
    getCenterListData();
  }, []);
  return (
    <div className="center-list-container">
      <div className="secondary-font center-list-header">
        Centers under this department
      </div>
      <div className="center-list-information-header"></div>
      {centerList.length
        ? centerList.map((centerData, index) => (
            <CenterInformation
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
