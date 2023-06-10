import {
  GridColDef,
  GridColumnHeaderParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import CarDialog from "../../components/profile-dialog/CarDialog";
import Barchart from "../../components/bar-chart/TestBarChart";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";
import InfoTable from "../../components/table/InfoTable";
import TransitionTab from "../../components/transitionTab/TransitionTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import DatePicker from "../../components/date-picker/DatePicker";
import DropZone from "../../components/data-import/DropZone";
import InfoAreaChart from "../../components/area-chart/AreaChart";
import CarPieChart from "../../components/pie-chart/CarPieChart";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import DropDownLocation from "../../components/dropDown-location/DropDownLocation";

function CarRegistry() {
  const { infoChartController } = chartStatisticHook();
  const {
    setProvinceCodeState,
    setDistrictCodeState,
    setLocationState,
    setTypeState,
    loading,
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
  }, [timeOutIndex,isGetData]);

  useEffect(() => {
    if (!loading) {
      setActiveIndex(timeOutIndex);
    }
  }, [loading]);

  useEffect(() => {
    setLocationState("nearExpired");
  }, []);

  function getDataByLocation(
    isDistrict: boolean,
    cityName: string,
    cityCode: number,
    districtName?: string,
    districtCode = 0
  ) {
    if (isDistrict) {
      setDistrictCodeState(districtCode);
    } else {
      setProvinceCodeState(cityCode);
    }
    setGetData(!isGetData);
  }
  return (
    <div className="pageContainer">
      <div className="upperContainer">
        <div className="chartManager">
          <DropDownLocation setState={getDataByLocation} />
          <div style={{ margin: "auto" }}>
            <DatePicker />
          </div>
        </div>
        <div className="statsDisplayDiv">
          <div className="chart-button-container">
            <div className="car-registry-overview-container">
              <h3 className="chart-button-description secondary-font">
                Number of vehicles
              </h3>
              <div
                className="overview-button"
                style={{ marginTop: "0px", marginRight: "0px" }}
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
            <div className="chartContainer">
              <InfoAreaChart />
            </div>
          </div>
          <div className="transitionTabDiv">
            <h3
              className="chart-button-description secondary-font"
              style={{ textAlign: "center", marginBottom: "10px" }}
            >
              Vehicle ratio
            </h3>
            <TransitionTab />
            <CarPieChart />
          </div>
        </div>
      </div>
      <div className="tableContainer">
        <InfoTable location="nearExpired" />
      </div>
    </div>
  );
}
export default CarRegistry;
