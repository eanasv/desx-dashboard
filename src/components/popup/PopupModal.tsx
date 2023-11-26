import React, { useEffect, useState } from "react";
import "./PopupModal.css";
import ProgressCircle from "../progressCircle/ProgressCircle";
import { getSkillPercentage } from "../../service/Service";
import ProgressBar from "../progressCircle/ProgressBar";
import JobChart from "../Graph/jobChart/JobChart";
import Score from "../score/Score";
import { SubHeader } from "../subHeader/SubHeader";

const PopupModal = (props) => {
  const [skillProgressValue, setskillProgressValue] = useState<any>(0);
  const [expandedRows, setExpandedRows] = useState({ technical: [], soft: [] });

  useEffect(() => {
    getSkillValue();
  }, []);

  const getSkillValue = async () => {
    var result = await getSkillPercentage(props.employeDetails.skills);
    setskillProgressValue(result);
  };

  const getAchievedStatus = (name) => {
    const item = props.employeDetails?.skills.find(
      (obj) => obj.name.toLowerCase() === name.toLowerCase()
    );
    return item ? item.achievedStatus : "";
  };

  const getEnrollmentStatus = (name) => {
    const item = props.employeDetails?.trainingNeeds.find(
      (obj) => obj.linkedCompetency?.toLowerCase() === name.toLowerCase()
    );
    return item ? item.courses : "";
    //return item;
  };

  // const toggleAccordionRow = (index) => {
  //   // if (expandedRows.includes(index)) {
  //   //   setExpandedRows(expandedRows.filter((row) => row !== index));
  //   // } else {
  //   //   setExpandedRows([...expandedRows, index]);
  //   // }
  // }
  const toggleAccordionRow = (index, tableType) => {
    setExpandedRows((prevState) => {
      const updatedRows = { ...prevState };
      if (updatedRows[tableType].includes(index)) {
        updatedRows[tableType] = updatedRows[tableType].filter(
          (row) => row !== index
        );
      } else {
        updatedRows[tableType] = [...updatedRows[tableType], index];
      }
      return updatedRows;
    });
  };
  //onClick={props.closeModal}  e.stopPropagation();
  return (
    <div className="popup-overlay" onClick={props.closeModal}>
      <div className="modal details-popup" onClick={(e) => e.stopPropagation()}>
        {/* <button className="close" onClick={props.closeModal}>
          &times;
        </button> */}
        {/* <div className="subheader-container">
          <div className="flex-box">
            <div className="flex-header"> {props.employeDetails.name} </div>
          </div>
          <div className="score-div1 entity-score orange-value">
            <Score score={props.employeDetails.employeeSkill} />
          </div>
          <JobChart item={props.employeDetails.subcategories} />
        </div> */}
        <SubHeader
          content={
            <div className="top-head">
              <div className="score-container">
                <Score score={props.employeDetails.employeeSkill} />
              </div>

              <div className="logo-container"></div>
              <div className="heading main-heading">
                {props.employeDetails.name}
              </div>
            </div>
          }
          jobTree={<JobChart item={props.employeDetails.roleTree} />}
        />
        <div className="margin-border"></div>
        <div className="modal-content">
          {" "}
          <div className="popup-main-container">
            <div className="skill-progress"></div>
          </div>
          <br />
          <div className="two-table-container">
            <div className="first-table">
              <table className="table">
                <thead>
                  <tr className="each-column-border table-heading">
                    <th className="each-column-border">Technical Skill</th>
                    <th className="each-column-border">Status</th>
                    <th className="each-column-border">Training</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {props.employeDetails?.technicalSkills?.map((item, index) => ( */}
                  {props.employeDetails?.skills?.technical_skills?.map(
                    (item, index) => (
                      <React.Fragment key={index}>
                        <tr
                          key={index}
                          // className={index % 2 === 0 ? "even-row" : "odd-row"}
                        >
                          <td className="each-column-border skill-name">
                            {item.name}
                          </td>
                          <td
                            className="each-column-border"
                            // style={{
                            //   backgroundColor:
                            //     getAchievedStatus(item) === "Achieved" ||
                            //     getAchievedStatus(item) === "achieved"
                            //       ? "green"
                            //       : "red",
                            // }}
                            style={{
                              backgroundColor:
                                item.achievedStatus === "achieved"
                                  ? "green"
                                  : "red",
                            }}
                          ></td>
                          <td
                            className="each-column-border  skill-name"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAccordionRow(index, "technical");
                            }}
                          >
                            {getEnrollmentStatus(item.name) ? (
                              <div className="training">Training details</div>
                            ) : (
                              "NA"
                            )}
                          </td>
                        </tr>
                        {getEnrollmentStatus(item.name) &&
                          expandedRows.technical.includes(index) && (
                            <tr
                              className={`accordion-content ${
                                expandedRows.technical.includes(index)
                                  ? "open"
                                  : ""
                              }`}
                            >
                              <td colSpan={4} className="each-column-border ">
                                {getEnrollmentStatus(item.name) && (
                                  <span>
                                    {getEnrollmentStatus(item.name).map(
                                      (item, index) => (
                                        <div className="flex-box">
                                          <div className="bold-text">
                                            {index + 1 + "  . "}
                                          </div>
                                          <div className="course-list">
                                            {item.course}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </span>
                                )}
                              </td>
                            </tr>
                          )}
                      </React.Fragment>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="first-table">
              <table className="table">
                <thead>
                  <tr className="table-heading">
                    <th className="each-column-border">Soft Skill</th>
                    <th className="each-column-border">Status</th>
                    <th className="each-column-border">Training</th>
                  </tr>
                </thead>
                <tbody>
                  {props.employeDetails?.skills?.soft_skills?.map(
                    (item, index) => (
                      <React.Fragment key={index}>
                        <tr
                          key={index}
                          // className={index % 2 === 0 ? "even-row" : "odd-row"}
                        >
                          <td className="each-column-border  skill-name">
                            {item.name}
                          </td>
                          <td
                            style={{
                              backgroundColor:
                                item.achievedStatus === "achieved"
                                  ? "green"
                                  : "red",
                            }}
                          ></td>
                          <td
                            className="each-column-border  skill-name"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAccordionRow(index, "soft");
                            }}
                          >
                            {getEnrollmentStatus(item.name) ? (
                              <div className="training">Training details</div>
                            ) : (
                              "NA"
                            )}
                          </td>
                        </tr>
                        {getEnrollmentStatus(item.name) &&
                          expandedRows.soft.includes(index) && (
                            <tr
                              className={`accordion-content ${
                                expandedRows.soft.includes(index) ? "open" : ""
                              }`}
                            >
                              <td colSpan={4} className="each-column-border">
                                {getEnrollmentStatus(item.name) && (
                                  <span>
                                    {getEnrollmentStatus(item.name).map(
                                      (item, index) => (
                                        <div className="flex-box">
                                          <div className="bold-text">
                                            {index + 1 + "  . "}
                                          </div>
                                          <div className="course-list">
                                            {item.course}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </span>
                                )}
                              </td>
                            </tr>
                          )}
                      </React.Fragment>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          {props.employeDetails?.skills?.other_skills.length > 0 && (
            <div className="two-table-container">
              <div className="first-table">
                <table className="table-other">
                  <thead>
                    <tr className="each-column-border table-heading">
                      <th className="each-column-border">Other Skills</th>
                      <th className="each-column-border">Status</th>
                      <th className="each-column-border">Training</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {props.employeDetails?.technicalSkills?.map((item, index) => ( */}
                    {props.employeDetails?.skills?.other_skills?.map(
                      (item, index) => (
                        <React.Fragment key={index}>
                          <tr
                            key={index}
                            // className={index % 2 === 0 ? "even-row" : "odd-row"}
                          >
                            <td className="each-column-border skill-name">
                              {item.name}
                            </td>
                            <td
                              className="each-column-border"
                              // style={{
                              //   backgroundColor:
                              //     getAchievedStatus(item) === "Achieved" ||
                              //     getAchievedStatus(item) === "achieved"
                              //       ? "green"
                              //       : "red",
                              // }}
                              style={{
                                backgroundColor:
                                  item.achievedStatus === "achieved"
                                    ? "green"
                                    : "red",
                              }}
                            ></td>
                            <td
                              className="each-column-border  skill-name"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAccordionRow(index, "technical");
                              }}
                            >
                              {getEnrollmentStatus(item.name) ? (
                                <div className="training">Training details</div>
                              ) : (
                                "NA"
                              )}
                            </td>
                          </tr>
                          {getEnrollmentStatus(item.name) &&
                            expandedRows.technical.includes(index) && (
                              <tr
                                className={`accordion-content ${
                                  expandedRows.technical.includes(index)
                                    ? "open"
                                    : ""
                                }`}
                              >
                                <td colSpan={4} className="each-column-border ">
                                  {getEnrollmentStatus(item.name) && (
                                    <span>
                                      {getEnrollmentStatus(item.name).map(
                                        (item, index) => (
                                          <div className="flex-box">
                                            <div className="bold-text">
                                              {index + 1 + "  . "}
                                            </div>
                                            <div className="course-list">
                                              {item.course}
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            )}
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <br />
        </div>{" "}
        {/* <div className="second-item">
                        <ProgressBar score={item.score} />
                      </div> */}
        <div className="actions">
          <button className="button" onClick={props.closeModal}>
            close modal
          </button>
        </div>
      </div>
    </div>
  );
  //     <Popup trigger={<button className="button"> Open Modal </button>} modal>
  //       <span> Modal content </span>
  //     </Popup>
  //   );
};

export default PopupModal;
