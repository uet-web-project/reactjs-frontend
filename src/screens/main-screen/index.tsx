import React, { useEffect } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import "./styles.css";
import { get } from "../../api/get";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
    } else {
      try {
        const res = await axiosInstance.get(get(token).verifyToken);
        console.log(res);

        if (res.status === 200) {
          navigate("/landing-page");
        } else {
          navigate("/auth/login");
        }
      } catch (err) {
        navigate("/auth/login");
      }
    }
  }

  return (
    <div className="main-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Main;
