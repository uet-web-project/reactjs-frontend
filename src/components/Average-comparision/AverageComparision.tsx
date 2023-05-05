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
    <div>
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
      {/* <MonthlySideInformation/> */}
    </div>
  );
}

export default MonthlyComparision;
