import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import { allSkillsByRoleId } from "../../service/Config";

export const CompetancyEvaluation = () => {
  const initialCourse = {
    course_name: "",
    enrollment_date: "",
    enrollment_result: "",
  };
  const [allSkills, setAllSkills] = useState({
    technicalSkills: [],
    softSkills: [],
  });
  const [employeeData, setEmployeeData] = useState({
    employee_number: "",
    name: "",
    role: "",
    organization: "",
    total_exp: "",
    cs_exp: "",
    job_profile: "",
    skills: [],
  });

  useEffect(() => {
    // Fetch skills from the backend API
    // Mocking the response for demonstration purposes
    const mockSkills = {
      technicalSkills: [
        "Statistics",
        "Applied Mathematics",
        "SQL",
        "Data Visualization",
        "Neural Networks",
        "Software Development",
        "Unsupervised Learning",
        "Natural Language Processing",
        "Project Management",
        "Strategy Implementation",
      ],
      softSkills: ["Leadership", "Creative Thinking"],
    };
    setAllSkills(mockSkills);
  }, []);

  const initialSkill = (skillName) => {
    return {
      name: skillName,
      evaluation_result: "",
      evaluation_date: "",
      courses: [initialCourse],
    };
  };

  const handleAddSkill = (skillName) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, initialSkill(skillName)],
    }));
  };

  const handleAddCourse = (skillIndex) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill, idx) =>
        idx === skillIndex
          ? { ...skill, courses: [...skill.courses, { ...initialCourse }] }
          : skill
      ),
    }));
  };

  const handleSkillChange = (e, skillIndex) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill, idx) =>
        idx === skillIndex ? { ...skill, [name]: value } : skill
      ),
    }));
  };

  const handleCourseChange = (e, skillIndex, courseIndex) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill, sIdx) =>
        sIdx === skillIndex
          ? {
              ...skill,
              courses: skill.courses.map((course, cIdx) =>
                cIdx === courseIndex ? { ...course, [name]: value } : course
              ),
            }
          : skill
      ),
    }));
  };

  const handleSave = () => {
    console.log(employeeData);
    // Send 'employeeData' to the backend API for saving
  };

  return (
    <div className="skill-container">
      {allSkills.technicalSkills.map((skill, skillIndex) => (
        <div key={skillIndex} className="each-skill-row">
          {/* <input type="text" name="name" value={skill} readOnly /> */}
          <div>
            <label>{skill}</label>
          </div>
          <div>
            <input type="checkbox" onChange={() => {}} /> Achieved
          </div>
          {/* <input
            type="text"
            name="evaluation_result"
            value={skill.evaluation_result}
            onChange={(e) => handleSkillChange(e, skillIndex)}
            placeholder="Evaluation Result"
          /> */}
          <button onClick={() => handleAddSkill(skill)}>Add Course</button>

          {employeeData.skills.map(
            (empSkill, empSkillIndex) =>
              empSkill.name === skill && (
                <div key={empSkillIndex}>
                  {/* Add more input fields for evaluation date, etc. */}
                  {empSkill.courses.map((course, courseIndex) => (
                    <div key={courseIndex}>
                      <input
                        type="text"
                        value={course.course_name}
                        onChange={(e) =>
                          handleCourseChange(e, empSkillIndex, courseIndex)
                        }
                        placeholder="Course Name"
                      />
                      {/* Add input fields for enrollment date, enrollment result, etc. */}
                      {courseIndex === empSkill.courses.length - 1 && (
                        <button onClick={() => handleAddCourse(empSkillIndex)}>
                          +
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )
          )}
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
function handleAddTrainingDetails(arg0: string, id: any): void {
  throw new Error("Function not implemented.");
}
