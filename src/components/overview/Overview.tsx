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
          <h3 className="overview-text secondary-font"> Overview </h3>
          <p className="overview-description secondary-font">
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
          <Barchart
            data={[
              { name: "Jan", cars: 4000 },
              { name: "Feb", cars: 3000 },
              { name: "Mar", cars: 2000 },
              { name: "Apr", cars: 2780 },
              { name: "May", cars: 1890 },
              { name: "Jun", cars: 2390 },
              { name: "Jul", cars: 3490 },
            ]}
          />
          <p className="chart-description">The number of car registry </p>
        </div>
        <div className="vertical-chart">
          <Verticalchart
            data={[
              {
                name: "Car",
                cars: 800,
              },
              {
                name: "Truck",
                cars: 967,
              },
              {
                name: "Bus",
                cars: 1098,
              },
            ]}
          />
          <p className="chart-description">
            The number of car expired base on car types
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
