import React from "react";
import "./styles.css";
import { DateField } from "@mui/x-date-pickers/DateField";
import moment from "moment";
import { alignProperty } from "@mui/material/styles/cssUtils";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Piechart from "../pie-chart/Piechart";
import MonthlySideInformation from "../monthly-side-information/MonthlySideInformation";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
function MonthlyComparision() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayString = `${moment(firstDay).format("DD/MM/YYYY")}`;
  const today = `${moment(new Date()).format("DD/MM/YYYY")}`;
  return (
    <div className="average-comparision">
      <div className="monthly-descripsion">
        <h3 className="secondary-font monthly-average-text">Monthly Average</h3>
        <div className="monthly-date secondary-color">
          {/* <CalendarMonthIcon sx={{ marginRight: "5px", fontSize: "17px" }} /> */}
          <div
            className="date-range"
            style={{
              width: 150,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div>{firstDayString}</div>
            {/* &#8595; */} -<div>{today}</div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
        <MonthlySideInformation title="Number of cars registerd" />
      </div>
    </div>
  );
}

export default MonthlyComparision;
