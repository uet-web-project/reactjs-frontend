import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav-bar/Navbar";
import axiosInstance from "../../utils/axios";
import Overview from "../../components/overview/Overview";
import MonthlyComparision from "../../components/average-comparision/AverageComparision";
import RecentRegisteredCarTable from "../../components/table/RecentRegisteredCarTable";
import CenterList from "../../components/center-list/CenterList";
import { accountHook } from "../../redux/hooks/accountHooks";

// style
import "./styles.css";

function LandingPage() {
  const { getProfile } = accountHook();
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <div className="data-group">
        <Overview />
        <MonthlyComparision />
      </div>
      <div className="data-group">
        <RecentRegisteredCarTable />
        <CenterList />
      </div>
    </div>
  );
}

export default LandingPage;
