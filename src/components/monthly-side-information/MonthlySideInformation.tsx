import React from "react";
import Piechart from "../pie-chart/Piechart";
import "./styles.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { UpCircleOutlined } from "@ant-design/icons";

function MonthlySideInformation( {title}:{title:string}) {
  return (
    <div className="monthly-registey-car">
      <h4>{title}</h4>
      <span>
      <Piechart />
      <div className="monthly-side-information">
          <span
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p className="monthly-percentage-information"> 43% </p>
            <UpCircleOutlined style={{ width: 20, height: 20 }} />
          </span>
          <p className="monthly-quantity-information"> 1000</p> 
        </div>
       </span>
    </div>
  );
}

export default MonthlySideInformation;
