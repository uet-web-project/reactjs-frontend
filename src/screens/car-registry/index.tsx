import Barchart from "../../components/bar-chart/TestBarChart";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";
import TestTable from "../../components/table/Table";
import TransitionTab from "../../components/transitionTab/TransitionTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import FilterCar from "../../components/filter/FilterCar";
import DatePicker from "../../components/date-picker/DatePicker";

const GraphData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];
const TableData = [{ id: 1, name: "fafdas" }];
function CarRegistry() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  useEffect(() => {});

  const handleButtonClick = (index: number) => {
    if (activeIndex !== index) setActiveIndex(index);
    else {
      setActiveIndex(4);
    }
  };

  return (
    <div className="pageContainer">
      <div className="upperContainer">
        <div className="statsDisplayDiv">
          <div className="chartManager">
            <p style={{ marginTop: "auto",marginBottom:"auto" }}>Manage</p>
            <div style={{ margin: "auto" }}>
              <DatePicker />
            </div>
          </div>
          <div className="chartUpperButDiv">
            <div className="chartUpperButDivHolder">
              <button
                id="chartUpperBut1"
                className={`chartUpperBut ${activeIndex === 0 ? "active" : ""}`}
                onClick={() => handleButtonClick(0)}
              >
                BUS
              </button>
              <span></span>
            </div>
            <div className="chartUpperButDivHolder">
              <button
                id="chartUpperBut2"
                className={`chartUpperBut ${activeIndex === 1 ? "active" : ""}`}
                onClick={() => handleButtonClick(1)}
              >
                CAR
              </button>
            </div>
            <div className="chartUpperButDivHolder">
              <button
                id="chartUpperBut3"
                className={`chartUpperBut ${activeIndex === 2 ? "active" : ""}`}
                onClick={() => handleButtonClick(2)}
              >
                TRUCK
              </button>
              <span></span>
            </div>
          </div>
          <div className="chartContainer">
            <Barchart data={GraphData} />
          </div>
        </div>
        <div className="transitionTabDiv">
          <TransitionTab />
        </div>
      </div>
      <div className="tableContainer">
        <div className="firstPart">
          <FilterCar />
          <div className="generalInputContainer">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Search"
                sx={{ color: "white", mr: 1, my: 0.5 }}
                variant="standard"
              />
            </Box>
          </div>
        </div>
        <div className="secondPart">
          <TestTable cars={TableData} type="cars" />
        </div>
      </div>
    </div>
  );
}
export default CarRegistry;
