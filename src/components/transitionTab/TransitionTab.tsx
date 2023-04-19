import React from "react";
import "./styles.css";
import { colors } from "@mui/material";

function TransitionTab() {
  return (
    <div className="transitionTab">
      <div>
        <button>tab</button>
        <button>tab</button>
        <button>tab</button>
      </div>
      <div style={{backgroundColor:'green'}}>
        hello
      </div>
    </div>
  );
}

export default TransitionTab;
