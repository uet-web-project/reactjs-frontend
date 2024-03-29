import { current } from "@reduxjs/toolkit";
import React from "react";
import Button from "../../button/Button";

function StepperControl({
  handleClick,
  currentStep,
  steps,
}: {
  handleClick: (action?: string) => void;
  currentStep: number;
  steps: string[];
}) {
  return (
    <div className="container flex justify-around mt-10 mb-4">
      <button
        onClick={() => handleClick("back")}
        className={`bg-white text-slate-400 uppercase
         py-2 px-4 rounded-xl font-semibold cursor-pointer 
         border-2 border-slate-300 hover:bg-slate-700 
         hover:text-white transition duration-200 ease-in-out ${
           currentStep == 1 ? "opacity-50 cursor-not-allowed" : ""
         }`}
      >
        {" "}
        Back
      </button>

      <button
        onClick={() => handleClick("next")}
        style={{ backgroundColor: "#62d3b7" }}
        className="text-white uppercase
         py-2 px-4 rounded-xl font-semibold 
         cursor-pointer hover:bg-slate-700 
         hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep == steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}

export default StepperControl;
