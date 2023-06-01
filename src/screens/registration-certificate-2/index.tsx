import React, { useState } from "react";
import StepperControl from "../../components/certification-vehicle/stepper/StepperControl";
import Stepper from "../../components/certification-vehicle/stepper/Stepper";
import Final from "../../components/certification-vehicle/steps/Final";
import OwnerInformation from "../../components/certification-vehicle/steps/OwnerInformation";
import VehicleInformation from "../../components/certification-vehicle/steps/VehicleInformation";
import { certificationStepHook } from "../../redux/hooks/certificationStepHooks";
import VehicleInformation2 from "../../components/certification-vehicle/steps/VehicleInformation2";

function RegistrationCertificate2() {
  const [currentStep, setCurrentStep] = useState(1);
  const { certificationStep, setNewCertificationStep } =
    certificationStepHook();

  const steps = ["Vehicle Information", "Owner Information", "Complete"];
  const displayStep = (step: number) => {
    switch (step) {
      case 0:
        return <VehicleInformation />;
      case 0.1:
        return <VehicleInformation2/>
      case 2:
        return <OwnerInformation />;
      case 3:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction?: string) => {
    let newStep = certificationStep;

    direction == "next" ? newStep++ : newStep--;

    newStep >= 0 && newStep <= steps.length && setNewCertificationStep(newStep);
  };
  return (
    <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
      <div className="container horizontal mt-5">
        <Stepper steps={steps} currentStep={certificationStep} />
      </div>

      <div className="my-10 p-10">{displayStep(certificationStep)}</div>
      <StepperControl
        handleClick={handleClick}
        currentStep={certificationStep}
        steps={steps}
      />
    </div>
  );
}

export default RegistrationCertificate2;
