import React, { useEffect } from "react";
import Piechart from "../pie-chart/Piechart";
import "./styles.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { DownCircleOutlined, UpCircleOutlined } from "@ant-design/icons";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";

function MonthlySideInformation({ title }: { title: string }) {
  const { getDataForMonthlyComparison, carRegisteredMonthlyComparison } =
    chartStatisticHook();
  useEffect(() => {
    getDataForMonthlyComparison();
  }, []);
  const carRegisteredMonthlyComparisonPercent =
    carRegisteredMonthlyComparison[1] && carRegisteredMonthlyComparison[0]
      ? Math.round(
          (carRegisteredMonthlyComparison[1]?.value /
            (carRegisteredMonthlyComparison[1]?.value +
              carRegisteredMonthlyComparison[0]?.value)) *
            100
        )
      : 0;
  return (
    <div className="monthly-registey-car">
      <h3
        className="secondary-font text-base text-gray-700 font-medium"
        style={{ textAlign: "center" }}
      >
        {title}
      </h3>
      <div>
        <Piechart />
        <div className="monthly-side-information">
          <span
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p className="monthly-percentage-information secondary-font">
              {`${carRegisteredMonthlyComparisonPercent}%`}
            </p>
            {carRegisteredMonthlyComparisonPercent >= 50 ? (
              <UpCircleOutlined style={{ width: 20, height: 20 }} />
            ) : (
              <DownCircleOutlined style={{ width: 20, height: 20 }} />
            )}
          </span>
          <p className="monthly-quantity-information secondary-font">
            Vehicles registered this month:{" "}
            <span style={{ fontWeight: "bold" }}>
              {carRegisteredMonthlyComparison[1]?.value}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MonthlySideInformation;
