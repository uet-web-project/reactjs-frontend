import React, { useEffect } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import "./styles.css";
import { getAPI } from "../../api/getAPI";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const token = localStorage.getItem("token");
  }

  return (
    <div className="main-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Main;
