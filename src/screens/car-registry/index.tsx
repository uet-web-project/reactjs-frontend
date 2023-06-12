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
import DropDownLocation from "../../components/dropDown-location/DropDownLocation";
import { Button } from "@mui/material";
import { setLocation } from "../../redux/slices/loadingSlice";
import { locationHook } from "../../redux/hooks/locationCode";

function CarRegistry() {
  const pathLocation = useLocation();
  const { infoChartController, getDataForDetailedTable } = chartStatisticHook();
  const {
    setProvinceCodeState,
    setDistrictCodeState,
    setLocationState,
    setTypeState,
    loading,
    location,
  } = loadingHook();

  const [isGetData, setGetData] = useState<boolean>(false);
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
  }, [timeOutIndex, isGetData]);

  useEffect(() => {
    if (!loading) {
      setActiveIndex(timeOutIndex);
    }
  }, [loading]);

  useEffect(() => {
    if (pathLocation.pathname.includes("car")) {
      setLocationState("car");
    } else if (pathLocation.pathname.includes("center")) {
      setLocationState("center");
    } else if (pathLocation.pathname.includes("expired")) {
      setLocationState("nearExpired");
    }
  }, [pathLocation.pathname]);

  function getDataByLocation(
    isDistrict: boolean,
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode = 0
  ) {
    if (isDistrict) {
      setProvinceCodeState(cityCode);
      setDistrictCodeState(districtCode);
    } else {
      setProvinceCodeState(cityCode);
      setDistrictCodeState(0);
    }
    setGetData(!isGetData);
  }

  return (
    <div className="pageContainer">
      {location !== "center" && (
        <div className="chart-button-container">
          <div className="car-registry-overview-container">
            <div className="overview-text-container">
              <h3 className="overview-text secondary-font">
                {location === "car"
                  ? "Registered of vehicles"
                  : "Near-expired vehicles"}
              </h3>
              <p className="overview-description secondary-font">
                {location === "car"
                  ? "View all registered vehicles within a date range."
                  : "View vehicles that are about to be expired."}
              </p>
            </div>
            <div className="chart-controller">
              <div className="chartManager">
                <div className="location-dropdown-container">
                  <DropDownLocation setState={getDataByLocation} />
                </div>
                <DatePicker />
              </div>
              <div
                className="overview-button"
                style={{
                  marginLeft: "10px",
                  display: "inline-block",
                }}
              >
                <Button
                  className={`week-button ${
                    activeIndex === 0 ? "selected-button" : ""
                  }`}
                  onClick={() => handleButtonClick(0)}
                >
                  Bus
                </Button>
                <Button
                  className={`month-button ${
                    activeIndex === 1 ? "selected-button" : ""
                  }`}
                  onClick={() => handleButtonClick(1)}
                >
                  Car
                </Button>
                <Button
                  className={`year-button ${
                    activeIndex === 2 ? "selected-button" : ""
                  }`}
                  onClick={() => handleButtonClick(2)}
                >
                  Truck
                </Button>
              </div>
            </div>
          </div>
          <div className="chartContainer">
            <InfoAreaChart />
            <CarPieChart />
          </div>
        </div>
      )}
      <div className="tableContainer">
        <InfoTable />
      </div>
    </div>
  );
}
export default CarRegistry;
