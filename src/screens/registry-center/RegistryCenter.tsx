import React from "react";
import Barchart from "../../components/bar-chart/TestBarChart";
import "./styles.css";
import TestTable from "../../components/table/Table";
import TransitionTab from "../../components/transitionTab/TransitionTab";
import { useLocation } from "react-router-dom";
function RegistryCenter() {
  const location = useLocation();
  return (
    <div className="pageContainer">
      <div className="statsDiplayDiv">
        <div style={{ margin: "10px" }}>
          <Barchart />
        </div>
        <TestTable />
      </div>
      <div className="transitionTabDiv">
        <TransitionTab  />
      </div>
    </div>
  );
}

export default RegistryCenter;