import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "./styles.css";
function CenterInformation({
  centerIndex,
  centerName,
  centerLocation,
  centerPhoneNumber,
}: {
  centerIndex: number;
  centerName: string;
  centerLocation: string;
  centerPhoneNumber: string;
}) {
  return (
    <div className="center-information-container">
      <div className="center-information secondary-font">
        <div style={{ display: "inline-block" ,marginRight:"8px", marginLeft:"7px"}}>{centerIndex}</div>
        <div className="center-detail-information">
          <div style={{ marginBottom: "4px" }}>{centerName}</div>
          <div>{centerLocation}</div>
        </div>
      </div>
      <div className="contact-information">{centerPhoneNumber}</div>
    </div>
  );
}

export default CenterInformation;
