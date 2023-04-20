import React from "react";
import "./styles.css";
import { Button } from "@mui/material";
import Barchart from "../bar-chart/Barchart";
import Verticalchart from "../vertical-composed-chart/Verticalchart";

function Overview() {
  return (
    <div className="overview-container">
      <div className="overview-title">
        <div className="overview-text-containner">
          <h3 className="overview-text"> Overview </h3>
          <p className="overview-description">
            {" "}
            View all car registry and expired cars.
          </p>
        </div>
        <div className="overview-button">
          <Button className="month-button selected-button"> Month</Button>
          <Button className="year-button">Year</Button>
          <Button className="all-time-button">All</Button>
        </div>
      </div>
      <div className="chart-container">
        <div className="barchart">
          <Barchart />
        </div>
        <div className="vertical-chart">
          <Verticalchart />
        </div>
      </div>
    </div>
  );
}

export default Overview;
