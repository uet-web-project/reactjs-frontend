import React, { useEffect, useState } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import "./styles.css";
import { getAPI } from "../../api/getAPI";
import { accountHook } from "../../redux/hooks/accountHooks";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import LoadingOverlay from "react-loading-overlay-ts";

function Main() {
  const location = useLocation();
  const { loading } = loadingHook();
  const [Loading, setLoading] = useState(loading);
  const { getProfile } = accountHook();
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    if (loading) setLoading(true);
    else setLoading(false);
    console.log(Loading);
  }, []);

  async function checkToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/department-login");
    } else {
      try {
        const res = await axiosInstance.get(getAPI(token).verifyToken);

        if (res.status === 200) {
          if (location.pathname === "/") {
            navigate("/landing-page");
          }
        } else {
          navigate("/auth/department-login");
        }
      } catch (err) {
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
