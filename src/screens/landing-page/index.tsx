import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = window.localStorage.getItem("id");
    if (!id) {
      navigate("/authentication/login");
    }
  }, []);

  return <div>index</div>;
}

export default LandingPage;
