import React, { useState } from "react";
import { accountHook } from "../../../redux/hooks/accountHooks";
import Button from "../../../components/button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import TextInput from "../../../components/input/text-input/TextInput";

function CenterInfo() {
  const { centerProfile, updateProfile } = accountHook();
  const [editables, setEditables] = useState({
    name: centerProfile.name,
    phoneNumber: centerProfile.phoneNumber,
    location: centerProfile.location,
  });
  const [isEditName, setIsEditName] = useState(false);
  const [isEditPhoneNum, setIsEditPhoneNum] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  function changeEditables(event: any, fieldName: string) {
    setEditables({
      ...editables,
      [fieldName]: event.target.value,
    });
  }

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
            {isEditName ? (
              <TextInput
                type="text"
                value={editables.name}
                onChange={(e) => changeEditables(e, "name")}
              />
            ) : (
              <span>{centerProfile.name}</span>
            )}
          </span>
          {isEditName ? (
            <div>
              <button
                style={{ marginRight: 10 }}
                onClick={() => setIsEditName(!isEditName)}
              >
                <DoneIcon />
              </button>
              <button onClick={() => setIsEditName(!isEditName)}>
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditName(!isEditName)}>
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
              console.log("Change password");
            }}
          />
        </span>
      </div>

      <div className="spacer" />

      <div className="section-container">
        <h1 className="section-title">Contact</h1>
        <span className="info-span">
          <span>
            <h1 className="field-title">Phone number</h1>
            {isEditPhoneNum ? (
              <TextInput
                type="text"
                value={editables.phoneNumber}
                onChange={(e) => changeEditables(e, "phoneNumber")}
              />
            ) : (
              <span>{centerProfile.phoneNumber}</span>
            )}
          </span>
          {isEditPhoneNum ? (
            <div>
              <button
                style={{ marginRight: 10 }}
                onClick={() => setIsEditPhoneNum(!isEditPhoneNum)}
              >
                <DoneIcon />
              </button>
              <button onClick={() => setIsEditPhoneNum(!isEditPhoneNum)}>
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditPhoneNum(!isEditPhoneNum)}>
              <EditIcon />
            </button>
          )}
        </span>
        <span className="info-span">
          <span>
            <h1 className="field-title">Address</h1>
            {isEditAddress ? (
              <TextInput
                type="text"
                value={editables.location}
                onChange={(e) => changeEditables(e, "location")}
              />
            ) : (
              <span>{centerProfile.location}</span>
            )}
          </span>
          {isEditAddress ? (
            <div>
              <button
                style={{ marginRight: 10 }}
                onClick={() => setIsEditAddress(!isEditAddress)}
              >
                <DoneIcon />
              </button>
              <button onClick={() => setIsEditAddress(!isEditAddress)}>
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button onClick={() => setIsEditAddress(!isEditAddress)}>
              <EditIcon />
            </button>
          )}
        </span>
      </div>
    </div>
  );
}

export default CenterInfo;
