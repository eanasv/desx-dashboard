import React, { useState } from "react";
import { countryList } from "../../service/Constants";
import { SimpleDropDown } from "../dropDown/SimpleDropDown";
import { InputField } from "../InputField/InputField";
import { TextArea } from "../TextArea/TextArea";
import "./Personal.css";

interface personalInterfaceProps {
  roleList;
  entityList;
  userDetails: any;
}
export const Personal: React.FC<personalInterfaceProps> = ({
  roleList,
  entityList,
  userDetails,
}) => {
  const [formData, setFormData] = useState({
    employeeNumber: "",
    employeeName: "",
    role: "",
    nationality: "",
    totalYearsExp: "",
    csExperience: "",
    jobDescription: "",
    organization: userDetails.entity == "" ? "" : userDetails.entity,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace 'YOUR_BACKEND_API_URL' with your actual backend API endpoint
      // const response = await axios.post("YOUR_BACKEND_API_URL", formData);

      // console.log("Form data submitted:", response.data);
      // Optionally, reset the form after successful submission
      setFormData({
        employeeNumber: "",
        employeeName: "",
        role: "",
        nationality: "",
        totalYearsExp: "",
        csExperience: "",
        jobDescription: "",
        organization: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Employee Number"
          value={formData.employeeNumber}
          onChange={handleChange}
          name="employeeNumber"
          placeholder="Employee Number"
        />

        <InputField
          label="Employee Name"
          value={formData.employeeName}
          onChange={handleChange}
          name="employeeName"
          placeholder="Employee Name"
        />
        <SimpleDropDown
          options={roleList}
          label="Role"
          value={formData.role}
          onChange={handleChange}
          name="role"
        />
        <SimpleDropDown
          options={entityList}
          label="Organization"
          value={formData.organization}
          onChange={handleChange}
          name="organization"
          userDetails={userDetails}
        />

        <SimpleDropDown
          options={countryList}
          label="Nationality"
          value={formData.nationality}
          onChange={handleChange}
          name="nationality"
        />

        <InputField
          label="Total experience"
          value={formData.totalYearsExp}
          onChange={handleChange}
          name="totalYearsExp"
          placeholder="total experience"
        />
        <InputField
          label="CS experience"
          value={formData.csExperience}
          onChange={handleChange}
          name="csExperience"
          placeholder="cs experience"
        />
        <TextArea
          label="Job Description"
          value={formData.jobDescription}
          onChange={handleChange}
          name="jobDescription"
          placeholder="Write here"
        />
        {/* </div> */}
        {/* Other input fields (Name, Role Dropdown, Nationality Dropdown, Total Years Exp, CS Exp, Job Description) */}

        {/* <button type="submit">Next</button> */}
      </form>
    </div>
  );
};
