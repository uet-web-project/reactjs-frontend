import Barchart from "../../components/bar-chart/BarChart";
import "./styles.css";
import TestTable from "../../components/table/Table";
import TransitionTab from "../../components/transitionTab/TransitionTab";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CarRegistry() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="pageContainer">
      <div className="statsDisplayDiv">
        <div className="chartUpperButDiv">
          <button
            className={`chartUpperBut ${activeIndex === 0 ? "active" : ""}`}
            onClick={() => handleButtonClick(0)}
          >
            hello
          </button>
          <button
            className={`chartUpperBut ${activeIndex === 1 ? "active" : ""}`}
            onClick={() => handleButtonClick(1)}
          >
            hello
          </button>
          <button
            className={`chartUpperBut ${activeIndex === 2 ? "active" : ""}`}
            onClick={() => handleButtonClick(2)}
          >
            hello
          </button>
        </div>
        <div className="chartContainer">
          <Barchart />
        </div>
        <div className="tableContainer">
          <TestTable />
        </div>
      </div>
      <div className="transitionTabDiv">
        <TransitionTab />
      </div>
    </div>
  );
}

function onClick() {}
export default CarRegistry;
