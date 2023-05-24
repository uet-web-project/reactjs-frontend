import React, { useEffect, useState } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import "./styles.css";
import { getAPI } from "../../api/getAPI";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import LoadingOverlay from "react-loading-overlay-ts";

function Main() {
  const { loading } = chartStatisticHook();
  const [Loading, setLoading] = useState(loading);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    if (loading) setLoading(true);
    else setLoading(false);
    console.log(Loading);
  });

  async function checkToken() {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/auth/login");
    // } else {
    //   try {
    //     const res = await axiosInstance.get(getAPI(token).verifyToken);
    //     console.log(res);
  }
    if (!token) {
      navigate("/auth/department-login");
    } else {
      try {
        const res = await axiosInstance.get(getAPI(token).verifyToken);
        console.log(res);

        if (res.status === 200) {
          navigate("/landing-page");
        } else {
          navigate("/auth/department-login");
        }
      } catch (err) {
        console.log(err);

        navigate("/auth/department-login");
      }
    }
  }

  return (
    <LoadingOverlay
      className="main-container"
      active={loading}
      spinner={<LoadingScreen />}
      text="Loading Content..."
    >
      <Navbar />
      <div className="parent-body">
        <Outlet />
      </div>
    </LoadingOverlay>
  );
}

export default Main;
