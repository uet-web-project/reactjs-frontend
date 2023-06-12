import React, { useState, useEffect } from "react";
import { accountHook } from "../../../redux/hooks/accountHooks";

function CenterInfo({ showCenterInfo }: { showCenterInfo?: boolean }) {
  const { centerProfile, updateProfile } = accountHook();
  const [editables, setEditables] = useState({
    name: centerProfile.name,
    phoneNumber: centerProfile.phoneNumber,
    location: centerProfile.location,
  });

  return (
    <div>
      <div className="section-container">
        <h1 className="section-title">Center profile</h1>
        <span className="info-span">
          <span>
            <h1 className="field-title">Center ID</h1>
            <span>{centerProfile.centerId}</span>
          </span>
        </span>
        <span className="info-span">
          <span>
            <h1 className="field-title">Center name</h1>
            <span>{centerProfile.name}</span>
          </span>
        </span>
      </div>
      <div className="spacer" />
      <div className="section-container">
        <h1 className="section-title">Contact</h1>
        <span className="info-span">
          <span>
            <h1 className="field-title">Phone number</h1>
            <span>{centerProfile.phoneNumber}</span>
          </span>
        </span>
        <span className="info-span">
          <span>
            <h1 className="field-title">Address</h1>
            <span>{centerProfile.fullAdress}</span>
          </span>
        </span>
      </div>
    </div>
  );
}

export default CenterInfo;
