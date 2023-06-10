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
        <span
          style={{ fontWeight: "600" }}
          className="text-base text-gray-700 font-medium"
        >{`${index}.`}</span>
        <div className="center-detail-information">
          <div>
            <div
              style={{ marginBottom: "4px", fontWeight: "600" }}
              className="text-base text-gray-700 font-medium"
            >
              {centerData.name}
            </div>
            <div
              style={{ fontStyle: "italic" }}
              className="text-base text-black"
            >
              {centerData.location}
            </div>
          </div>
          <div className="text-base text-black">{centerData.phoneNumber}</div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CenterInformation;
