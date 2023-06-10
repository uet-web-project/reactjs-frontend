import React from "react";
import { accountHook } from "../../redux/hooks/accountHooks";
import DepInfo from "./dep-info";
import CenterInfo from "./center-info";
import { Dialog, DialogTitle } from "@mui/material";

import "./styles.css";

function ProfileScreen({
  open,
  onClose,
  showCenterInfo,
}: {
  open: boolean;
  onClose: () => void;
  showCenterInfo?: boolean;
}) {
  const { isDepLogin } = accountHook();
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle sx={{ margin: "0 auto", fontWeight: "bold" }}>
        {isDepLogin ? "Department information" : "Center information"}
      </DialogTitle>
      <div className="secondary-font profile-container">
        {isDepLogin ? (
          showCenterInfo ? (
            <CenterInfo showCenterInfo />
          ) : (
            <DepInfo />
          )
        ) : (
          <CenterInfo />
        )}
      </div>
    </Dialog>
  );
}

export default ProfileScreen;
