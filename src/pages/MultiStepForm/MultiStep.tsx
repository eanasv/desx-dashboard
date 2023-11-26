import React from "react";
import "./MultiStepForm.css";

export const MultiStep = () => {
  const Header = () => {
    return (
      <div className="header">
        <h2>Multi-Step Form</h2>
        {/* Step Indicator */}
        <div className="step-indicator">
          {/* Span elements representing each step */}
          {/* Add onClick handlers to these spans to navigate between steps */}
          {/* Example: <span className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>1</span> */}
        </div>
      </div>
    );
  };

  // Step Components
  const Step1 = () => {
    return (
      <div className="step active">
        <h3>Step 1: Personal Information</h3>
        {/* Form fields for Step 1 */}
      </div>
    );
  };

  const Step2 = () => {
    return (
      <div className="step">
        <h3>Step 2: Contact Information</h3>
        {/* Form fields for Step 2 */}
      </div>
    );
  };

  const Step3 = () => {
    return (
      <div className="step">
        <h3>Step 3: Confirmation</h3>
        {/* Form fields for Step 3 */}
      </div>
    );
  };

  return (
    <div className="form">
      <Header />
      <Step1 />
      <Step2 />
      <Step3 />
    </div>
  );
};
