import React from "react";
import "./styles.css";
import { DateField } from "@mui/x-date-pickers/DateField";
import moment from "moment";
import { alignProperty } from "@mui/material/styles/cssUtils";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Piechart from "../pie-chart/Piechart";
import MonthlySideInformation from "../monthly-side-information/MonthlySideInformation";
function MonthlyComparision() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dateRange = `${moment(firstDay).format("Do MMMM YYYY")} - ${moment(
    new Date()
  ).format("Do MMMM YYYY")}`;
  return (
    <div className="average-comparision">
      <div className="monthly-descripsion">
        <h3 className="secondary-font monthly-average-text">
          {" "}
          Monthly Average
        </h3>
        <div className="monthly-date secondary-color">
          <CalendarMonthIcon sx={{ marginRight: "5px", fontSize: "17px" }} />
          {dateRange}
        </div>
      </div>
      <div style={{width:"100%", height:"100%"}}>
        <MonthlySideInformation title="Car Registry" />
      </div>
    </div>
  );
}

export default MonthlyComparision;
