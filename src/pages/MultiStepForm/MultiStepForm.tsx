import React, { useEffect, useState } from "react";
import { CompetancyEvaluation } from "../../components/EmployeeProfile/CompetancyEvaluation";
import { Personal } from "../../components/EmployeeProfile/Personal";
import { getHttp } from "../../service/APIRequest";
import { getUserDetails } from "../../service/Service";
import "./MultiStepForm.css";

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [roleList, setRoleList] = useState([]);
  const [entityList, setEntityList] = useState([]);
  // var userDeatilsString = sessionStorage.getItem("userDetails");
  // var userDetailsObj = JSON.parse(userDeatilsString);

  useEffect(() => {
    getRoleList();
    getEntityList();
    // return () => {
    //   second
    // }
  }, []);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleStep = (stepNumber) => {
    setStep(stepNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted!");
    // Reset form or navigate to the next page
  };

  const getEntityList = async () => {
    const response = await getHttp("entity/getNameDetails"); //
    await setEntityList(response);
  };

  const getRoleList = async () => {
    const response = await getHttp("api/roles/all"); //
    await setRoleList(response);
  };

  return (
    <div className="multi-step-form-container">
      <div className="header">
        <h2>Create Employee Profile</h2>
        <div className="step-indicator">
          <div className="step-labels">
            <span
              className={`step-number round1 ${step === 1 ? "active" : ""}`}
              onClick={() => handleStep(1)}
            >
              1
            </span>
            <span
              className={`step-label ${step === 1 ? "active" : ""}`}
              onClick={() => handleStep(1)}
            >
              Personal Information
            </span>

            <span
              className={`step-separator ${step === 1 ? "active" : ""}`}
            ></span>

            <span
              className={`step-number ${step === 2 ? "active" : ""}`}
              onClick={() => handleStep(2)}
            >
              2
            </span>
            <span
              className={`step-label ${step === 2 ? "active" : ""}`}
              onClick={() => handleStep(2)}
            >
              Employee Competency Evaluation
            </span>

            <span
              className={`step-separator ${step === 2 ? "active" : ""}`}
            ></span>

            <span
              className={`step-number ${step === 3 ? "active" : ""}`}
              onClick={() => handleStep(3)}
            >
              3
            </span>
            <span
              className={`step-label ${step === 3 ? "active" : ""}`}
              onClick={() => handleStep(3)}
            >
              Government Certifications
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {step === 1 && (
          <div className="step">
            <Personal
              roleList={roleList}
              entityList={entityList}
              userDetails={getUserDetails()}
            />
            {/* Your form fields for Step 1 */}
            <button
              type="button"
              className="multi-step-button"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step">
            <h3>Employee Competency Evaluation</h3>
            {/* Your form fields for Step 2 */}
            <CompetancyEvaluation />
            <button
              type="button"
              className="multi-step-button"
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              type="button"
              className="multi-step-button"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step">
            <h3>Step 3: Confirmation</h3>
            {/* Your form fields for Step 3 */}
            <button
              type="button"
              className="multi-step-button"
              onClick={handlePrev}
            >
              Previous
            </button>
            <button type="submit" className="multi-step-button">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
