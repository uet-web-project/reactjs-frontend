import "./styles.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function TransitionTab() {
  const { pathname } = location;
  const [selectedTab, setSelectedTab] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Update the selectedTab state when the pathname changes
    if (pathname.includes("/stats/cars")) {
      setSelectedTab("car");
    } else if (pathname.includes("/stats/centers")) {
      setSelectedTab("center");
    } else if (pathname.includes("/stats/expired")) {
      setSelectedTab("expired");
    } else {
      setSelectedTab("");
    }
  }, [pathname]);

  return (
    <div className="transitionTab">
      <div>
        <button
          className={selectedTab === "center" ? "selected" : "button"}
          onClick={() => navigate("/stats/centers")}
        >
          Center Registration
        </button>
        <button
          className={selectedTab === "car" ? "selected" : "button"}
          onClick={() => navigate("/stats/cars")}
        >
          Car Registry
        </button>
        <button
          className={selectedTab === "expired" ? "selected" : "button"}
          onClick={() => navigate("/stats/expired")}
        >
          Expired Car
        </button>
      </div>
      <div className="content">{pathname}</div>
    </div>
  );
}

export default TransitionTab;
