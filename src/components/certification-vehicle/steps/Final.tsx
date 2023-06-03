import React from "react";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { certificationStepHook } from "../../../redux/hooks/certificationStepHooks";
import { certificateHook } from "../../../redux/hooks/certificateHooks";
import { certificationHook } from "../../../redux/hooks/certificationHooks";

function Final() {
  const { setNewCertificationStep } = certificationStepHook();
  const { clearFormData } = certificationHook();
  const navigate = useNavigate();

  function handleClose() {
    clearFormData();
    setNewCertificationStep(0);
    navigate("/registration-certificate");
  }

  return (
    <div className="container md:mt-10 secondary-font">
      <div className="flex flex-col items-center">
        <div className="text-green-400">
          <CheckIcon
            sx={{
              fontSize: "50px",
              borderRadius: "50%",
              padding: "4px",
              backgroundColor: "green",
              color: "white",
            }}
          />
        </div>
        <div
          style={{ fontSize: "20px" }}
          className="mt-3 font-semibold uppercase text-green-500"
        >
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Successful to create vehicle certification.
        </div>
        <button
          onClick={handleClose}
          className="mt-10 h-10 px-5 text-green-700 transition-colors duration-150 border border-gray-300
      rounded-lg focus:shadow-outline hover:bg-green-500 hover:text-green-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Final;
