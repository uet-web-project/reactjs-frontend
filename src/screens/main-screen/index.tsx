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
    <div className="main-container">
      <Navbar />
      <div className="parent-body">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
