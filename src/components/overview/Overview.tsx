import React, { useState } from "react";
import "./styles.css";
import { Button } from "@mui/material";
import Barchart from "../bar-chart/Barchart";
import Verticalchart from "../vertical-composed-chart/Verticalchart";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";

function Overview() {
  const { getDataForCarTypeOverview, getDataForTotalOverviewChart } =
    chartStatisticHook();

  const [btnState, setBtnState] = useState("week");
  const changeToWeekData = () => {
    setBtnState("week");
    getDataForCarTypeOverview("week");
    getDataForTotalOverviewChart("week");
  };

  const changeToMonthData = () => {
    setBtnState("month");
    getDataForCarTypeOverview("month");
    getDataForTotalOverviewChart("month");
  };

  const changeToYearData = () => {
    setBtnState("year");
    getDataForCarTypeOverview("year");
    getDataForTotalOverviewChart("year");
  };
  return (
    <div className="overview-container">
      <div className="overview-title">
        <div className="overview-text-containner">
          <h3 className="overview-text secondary-font"> Overview </h3>
          <p className="overview-description secondary-font">
            {" "}
            View all car registry and expired cars.
          </p>
        </div>
        <div className="overview-button">
          <Button
            className={`week-button ${
              btnState == "week" ? "selected-button" : ""
            }`}
            onClick={changeToWeekData}
          >
            Week
          </Button>
          <Button
            className={`month-button ${
              btnState == "month" ? "selected-button" : ""
            }`}
            onClick={changeToMonthData}
          >
            Month
          </Button>
          <Button
            className={`year-button ${
              btnState == "year" ? "selected-button" : ""
            }`}
            onClick={changeToYearData}
          >
            Year
          </Button>
        </div>
      </div>
      <div className="chart-container">
        <div className="barchart">
          <Barchart />
          <p className="chart-description">The number of car registry </p>
        </div>
        <div className="vertical-chart">
          <Verticalchart />
          <p className="chart-description">
            The number of car expired base on car types
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
