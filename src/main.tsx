import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// test
import LoadingScreen from "./components/loading-screen/LoadingScreen";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LoadingScreen />
  </React.StrictMode>
);
