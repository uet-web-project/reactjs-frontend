import React from "react";
import { accountHook } from "../../redux/hooks/accountHooks";
import DepInfo from "./dep-info";
import CenterInfo from "./center-info";

import "./styles.css";

function ProfileScreen() {
  const { isDepLogin } = accountHook();
  return (
    <div className="secondary-font profile-container shadow-xl">
      {isDepLogin ? <DepInfo /> : <CenterInfo />}
    </div>
  );
}

export default ProfileScreen;
