import React, { useState } from "react";
import { accountHook } from "../../../redux/hooks/accountHooks";
import Button from "../../../components/button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "../../../components/input/text-input/TextInput";

function DepInfo() {
  const { depProfile, updateProfile } = accountHook();
  const [editedName, setEditedName] = useState(depProfile.name);
  const [isEditName, setIsEditName] = useState(false);

  function changeName(event: any) {
    setEditedName(event.target.value);
  }

  function onConfirmUpdate() {
    updateProfile({
      name: editedName,
    });
    setIsEditName(false);
  }

  function toggleEditName() {
    setIsEditName(!isEditName);
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
          {isEditName ? (
            <div>
              <button style={{ marginRight: 10 }} onClick={onConfirmUpdate}>
                <DoneIcon />
              </button>
              <button onClick={toggleEditName}>
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button onClick={toggleEditName}>
              <EditIcon />
            </button>
          )}
        </span>
        <span className="info-span">
          <Button
            style={{
              marginTop: "10px",
              padding: "5px 20px",
              fontWeight: "bold",
              backgroundColor: "#f5f5f5",
              color: "#ca3636",
            }}
            content="Change password"
            onClick={() => {
            }}
          />
        </span>
      </div>
    </div>
  );
}

export default DepInfo;
