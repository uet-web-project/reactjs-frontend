import React from "react";
import Barchart from "../../components/bar-chart/BarChart";
import "./styles.css";
import TestTable from "../../components/table/Table";
import TransitionTab from "../../components/transitionTab/TransitionTab";
import { useLocation } from "react-router-dom";
function ExpiredCar() {
  const location = useLocation();
  return (
    <div className="pageContainer">
      <div className="">
        <div style={{ margin: "10px" }}>
          <Barchart />
        </div>
        <TestTable />
      </div>
      <div className="transitionTabDiv">
        <TransitionTab/>
      </div>
    </div>
  );
}

export default ExpiredCar;
