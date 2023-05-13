import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav-bar/Navbar";
import axiosInstance from "../../utils/axios";
import PersonInformation from "../../components/person-card/PersonInformation";
import Overview from "../../components/overview/Overview";
import MonthlyComparision from "../../components/average-comparision/AverageComparision";
import RecentRegisteredCarTable from "../../components/table/RecentRegisteredCarTable";
import { depHook } from "../../redux/hooks/depHook";
import CenterList from "../../components/center-list/CenterList";

function LandingPage() {
  const {value, loading, callIncrement} = depHook();
  return (
    <div>
      <Overview />
      <MonthlyComparision />
      <RecentRegisteredCarTable/>
      <CenterList/>
      <div>{`value: ${value}`}</div>
      <button onClick={callIncrement}>Increment</button>
    </div>
  );
}

export default LandingPage;
