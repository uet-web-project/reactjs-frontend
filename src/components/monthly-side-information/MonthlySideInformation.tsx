import React from "react";
import Piechart from "../pie-chart/Piechart";
import "./styles.css";

function MonthlySideInformation() {
  return (
    <div className="monthly-registey-car">
      <h4>Registerd car</h4>
      <Piechart />
      <div className="monthly-side-information">
        <p className="monthly-percentage-information"> 26% </p>
        <p className="monthly-quantity-information"> 1000</p>
      </div>
    </div>
  );
}

export default MonthlySideInformation;
