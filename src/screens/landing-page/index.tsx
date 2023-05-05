import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/nav-bar/Navbar";
import axiosInstance from "../../utils/axios";
import PersonInformation from "../../components/person-card/PersonInformation";
import Overview from "../../components/overview/Overview";
import MonthlyComparision from "../../components/Average-comparision/AverageComparision";

function LandingPage() {
  return (
    <div>
      <Overview />
      <MonthlyComparision />
    </div>
  );
}

export default LandingPage;
