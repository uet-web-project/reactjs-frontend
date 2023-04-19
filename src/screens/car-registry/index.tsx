import React from "react";
import Graph from "../../components/graph/Graph";
import "./styles.css";
import TestTable from "../../components/table/Table";
import TransitionTab from "../../components/transitionTab/TransitionTab";
function CarRegistry() {
  return (
    <div className="pageContainer">
      <div className="statsDiplayDiv">
        <div style={{ margin: "10px" }}>
          <Graph />
        </div>
        <TestTable />
      </div>
      <div className="transitionTabDiv">
        <TransitionTab/>
      </div>
    </div>
  );
}

export default CarRegistry;
