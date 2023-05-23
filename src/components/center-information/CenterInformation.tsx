import React from "react";
import "./styles.css";
import { IRegistrationCenter } from "../../interfaces/registrationCenter.interface";
function CenterInformation({
  centerData,
  index,
}: {
  centerData: IRegistrationCenter;
  index: number;
}) {
  return (
    <div>
      <div className="center-information-container">
        <span style={{ fontWeight: "600" }}>{`${index}.`}</span>
        <div className="center-detail-information">
          <div>
            <div style={{ marginBottom: "4px", fontWeight: "600" }}>
              {centerData.name}
            </div>
            <div style={{ fontStyle: "italic" }}>{centerData.location}</div>
          </div>
          <div>{centerData.phoneNumber}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CenterInformation;
