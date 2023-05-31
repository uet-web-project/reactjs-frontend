import React, { useState } from "react";
import StepperControl from "../../components/stepper/StepperControl";
import Stepper from "../../components/stepper/Stepper";
import Final from "../../components/steps/Final";
import OwnerInformation from "../../components/steps/OwnerInformation";
import VehicleInformation from "../../components/steps/VehicleInformation";

function RegistrationCertificate2() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <VehicleInformation />;
      case 2:
        return <OwnerInformation />;
      case 3:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction?: string) => {
    let newStep = currentStep;

    direction == "next" ? newStep++ : newStep--;

    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <div className="my-10 p-10">
        {displayStep(currentStep)}
      </div>
      <StepperControl
        handleClick={handleClick}
        currentStep={currentStep}
        steps={steps}
      />
    </div>
  );
}

export default RegistrationCertificate2;
