import React from "react";
import "./styles.css";
import CenterInformation from "../center-information/CenterInformation";

function CenterList() {
  return (
    <div className="center-list-container">
      <div className="secondary-font center-list-header">
        Centers under this department
      </div>
      <CenterInformation
        centerIndex={1}
        centerName="Tran Thang"
        centerLocation="HaNoi"
        centerPhoneNumber="0971238954"
      />
    </div>
  );
}

export default CenterList;
