import "./styles.css";
import InfoTable from "../../components/table/InfoTable";
import TransitionTab from "../../components/transitionTab/TransitionTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import DatePicker from "../../components/date-picker/DatePicker";
import DropZone from "../../components/data-import/DropZone";
import InfoAreaChart from "../../components/area-chart/AreaChart";
import CarPieChart from "../../components/pie-chart/CarPieChart";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import { locationHook } from "../../redux/hooks/locationCode";
import DropDownLocation from "../../components/dropDown-location/DropDownLocation";

function CarRegistry() {
  const { getLocationCode } = locationHook();
  const { infoChartController } = chartStatisticHook();
  const { setLocationState, setTypeState, loading } = loadingHook();
  const [activeIndex, setActiveIndex] = useState<number>(3);
  const [timeOutIndex, setTimeOutIndex] = useState<number>(3);
  const handleButtonClick = (index: number) => {
    if (activeIndex !== index) {
      let typeState = "all";
      switch (index) {
        case 0:
          typeState = "bus";
          break;
        case 1:
          typeState = "car";
          break;
        case 2:
          typeState = "truck";
          break;
      }
      setTypeState(typeState);
      setTimeOutIndex(index);
    } else {
      setTypeState("all");
      setTimeOutIndex(3);
    }
  };

  useEffect(() => {
    infoChartController();
  }, [timeOutIndex]);

  useEffect(() => {
    if (!loading) {
      setActiveIndex(timeOutIndex);
    }
  }, [loading]);
  useEffect(() => {
    setLocationState("car");
    getLocationCode();
  }, []);

  return (
    <div className="pageContainer">
      <div className="upperContainer">
        <div className="chartManager">
          <DropDownLocation />
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>Manage</p>
          <div style={{ margin: "auto" }}>
            <DatePicker />
          </div>
        </div>
        <div className="statsDisplayDiv">
          <div className="chart-button-container">
            <div className="chartUpperButDiv">
              <div className="chartUpperButDivHolder">
                <button
                  id="chartUpperBut1"
                  className={`chartUpperBut ${
                    activeIndex === 0 ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(0)}
                >
                  BUS
                </button>
                <span></span>
              </div>
              <div className="chartUpperButDivHolder">
                <button
                  id="chartUpperBut2"
                  className={`chartUpperBut ${
                    activeIndex === 1 ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(1)}
                >
                  CAR
                </button>
              </div>
              <div className="chartUpperButDivHolder">
                <button
                  id="chartUpperBut3"
                  className={`chartUpperBut ${
                    activeIndex === 2 ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick(2)}
                >
                  TRUCK
                </button>
                <span></span>
              </div>
            </div>
            <div className="chartContainer">
              <InfoAreaChart />
            </div>
          </div>
          <div className="transitionTabDiv">
            <TransitionTab />
            <div
              className="pieChartContainer"
              style={{
                border: "1px solid #62b7d3",
                height: "220px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <CarPieChart />
            </div>
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <InfoTable location="car" />
      </div>
    </div>
  );
}
export default CarRegistry;
