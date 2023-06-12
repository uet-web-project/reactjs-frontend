import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav-bar/Navbar";
import axiosInstance from "../../utils/axios";
import Overview from "../../components/overview/Overview";
import MonthlyComparision from "../../components/Average-comparision/AverageComparision";
import RecentRegisteredCarTable from "../../components/table/RecentRegisteredCarTable";
import CenterList from "../../components/center-list/CenterList";
import { accountHook } from "../../redux/hooks/accountHooks";

// style
import "./styles.css";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function LandingPage() {
  const { isDepLogin } = accountHook();
  const { getProfile } = accountHook();
  const [screenWidth, screenHeight] = useWindowSize();
  useEffect(() => {
    getProfile();
  }, []);
  if (!isDepLogin) {
    return (
      <div>
        <div className="data-group">
          <Overview />
          <MonthlyComparision />
        </div>
        <div className="data-group">
          <RecentRegisteredCarTable />
          {isDepLogin ? <CenterList /> : null}
        </div>
      </div>
    );
  } else {
    if (screenWidth > 1200) {
      return (
        <div>
          <div className="data-group">
            <Overview />
            <MonthlyComparision />
          </div>
          <div className="data-group">
            <RecentRegisteredCarTable />
            {isDepLogin ? <CenterList /> : null}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Overview />
          <div className="responsive-group">
            <MonthlyComparision />
            {isDepLogin ? <CenterList /> : null}
          </div>
          <RecentRegisteredCarTable />
        </div>
      );
    }
  }
}

export default LandingPage;
