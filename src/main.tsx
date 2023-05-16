import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

//tét
import FilterCar from "./components/filter/FilterCar";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FilterCar />
  </React.StrictMode>
);
