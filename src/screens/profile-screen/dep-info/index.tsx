import React, { useState } from "react";
import { accountHook } from "../../../redux/hooks/accountHooks";
import TextInput from "../../../components/input/text-input/TextInput";

function DepInfo() {
  const { depProfile, updateProfile } = accountHook();
  const [editedName, setEditedName] = useState(depProfile.name);
  const [isEditName, setIsEditName] = useState(false);

  function changeName(event: any) {
    setEditedName(event.target.value);
  }

  return (
    <div>
      <div className="section-container">
        <h1 className="section-title">Department profile</h1>
        <span className="info-span">
          <span>
            <h1 className="field-title">Department ID</h1>
            <span>{depProfile.depId}</span>
          </span>
        </span>
        <span className="info-span">
          <span>
            <h1 className="field-title">Department name</h1>
            {isEditName ? (
              <TextInput type="text" value={editedName} onChange={changeName} />
            ) : (
              <span>{depProfile.name}</span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}

export default DepInfo;
