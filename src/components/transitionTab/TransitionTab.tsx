import "./styles.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import startOfMonth from "date-fns/startOfMonth";
import addMonths from "date-fns/addMonths";

const today = new Date();
const pastMonthStart = startOfMonth(addMonths(today, 0));
function TransitionTab() {
  const { setDateState, setTypeState } = loadingHook();
  const { pathname } = location;
  const [selectedTab, setSelectedTab] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
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
      <button
        id="transitionTabButton1"
        className={`text-base text-gray-700 font-medium text-xs ${
          selectedTab === "center" ? "selected" : "button"
        }`}
        onClick={() => {
          navigate("/stats/centers");
        }}
      >
        Center Registration
      </button>
      <button
        id="transitionTabButton2"
        className={`text-base text-gray-700 font-medium text-xs ${
          selectedTab === "car" ? "selected" : "button"
        }`}
        onClick={() => {
          navigate("/stats/cars");
          setDateState([
            pastMonthStart.toISOString().split("T")[0],
            today.toISOString().split("T")[0],
          ]);
          setTypeState("all");
        }}
      >
        Car Registry
      </button>
      <button
        id="transitionTabButton3"
        className={`text-base text-gray-700 font-medium text-xs ${
          selectedTab === "expired" ? "selected" : "button"
        }`}
        onClick={() => {
          navigate("/stats/expired");
          setDateState([
            pastMonthStart.toISOString().split("T")[0],
            today.toISOString().split("T")[0],
          ]);
          setTypeState("all");
        }}
      >
        Expired Car
      </button>
    </div>
  );
}

export default TransitionTab;
