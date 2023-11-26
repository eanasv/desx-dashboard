import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import { Certification } from "../../components/certification/Certification";

import Doughnut from "../../components/Graph/donutChart/Doughnut";
import RadialBarChart from "../../components/Graph/donutChart/RadialBarChart";
import Popup from "../../components/popup/Popup";
import PopupModal from "../../components/popup/PopupModal";
import TrainingPopup from "../../components/popup/TrainingPopup";
import Score from "../../components/score/Score";
import { SubHeader } from "../../components/subHeader/SubHeader";
import { getHttp } from "../../service/APIRequest";
import { getSkillPercentage } from "../../service/Service";
import "./EntityDetails.css";

export const EntityDetails = ({ entity1, backButtonClicked }, props) => {
  const location = useLocation();
  const [entity, setentity] = useState<any>(location.state);
  const [entityDetails, setentityDetails] = useState<any>();
  const [roleCount, setroleCount] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [thisEmployeeDetails, setthisEmployeeDetails] = useState();
  const [entityCatSkillSet, setentityCatSkillSet] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [trainingDetails, setTrainingDetails] = useState({
    showPopup: false,
    details: [],
  });
  const [isUp, setIsUp] = useState(true);

  const [isScoreUp, setScoreIsUp] = useState(true);

  const [openPopup, setOpenPopup] = useState(false);

  const [employeeMoreDetils, setemployeeMoreDetils] = useState<any>();

  const handleSortClick = (name, order) => {
    if (name == "name") {
      setIsUp(!isUp);
    } else {
      setScoreIsUp(!isScoreUp);
    }
    fetchEntityDetails(name, order);
  };

  function handleClick() {
    setShowPopup(!showPopup);
  }

  useEffect(() => {
    setcategoryList(categoryList);
  }, [categoryList]);

  const getAllCategory = () => {
    //main-categories/getAll
    const response = getHttp("main-categories/getAll")
      .then((response) => {
        setcategoryList(response);
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  // const getSubCategoryList = async (id) => {
  //   //categories/1/subcategories
  //   const response = await getHttp("categories/" + id + "/subcategories");
  //   setsubCategoryList(response);
  // };

  useEffect(() => {
    fetchEntityDetails("name", "asc");
  }, []);

  async function fetchEntityDetails(item?, order?) {
    const response = await getHttp("employees/" + entity.name, {
      name: item,
      filter: order,
    });
    var finalResult = [];

    fetchRoleCountsInEntity();
    for (var i = 0; i < response.length; i++) {
      response[i].skillToTalPercentage = getSkillPercentage(response[i].skills);
      finalResult.push(response[i]);
    }

    await setentityDetails(finalResult);

    getAllCategory();
    //await getColumnHeading(response);
  }

  const fetchRoleCountsInEntity = async () => {
    const response = await getHttp("entity/count-by-category/" + entity.name);
    await setroleCount(response);
    fetchSkillByCatInEntity();
  };

  const fetchSkillByCatInEntity = async () => {
    const response = await getHttp("skillByCatInEntity?entity=" + entity.name);
    setentityCatSkillSet(response);

    await settingEntityCatSkillSet(response);
  };

  const settingEntityCatSkillSet = async (data) => {
    setentityCatSkillSet(data);
  };

  const showThisEmployeeDetails = (employeeDetails) => {
    setShowPopup(true);
    setthisEmployeeDetails(employeeDetails);
  };

  const showThisEmployeeMoreDetails = (employeeMoreDetails) => {
    setOpenPopup(true);
    setemployeeMoreDetils(employeeMoreDetails.certifications);
  };

  const handleSubmit = (e) => {
    console.log("oo", e);
  };

  // const traininigNeedOfEmployee = (employeeDetails) => {
  //   setTrainingDetails({ ...trainingDetails, showPopup: true });
  //   setthisEmployeeDetails(employeeDetails);
  //   //employeeNumber
  //   getHttp("trainingNeeded", {
  //     employeeNumber: employeeDetails.employeeNumber,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       setTrainingDetails({ showPopup: true, details: response });
  //       // handle success
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       //setresponseText(error);
  //       // handle error
  //     });
  // };

  //test

  // const options2 = [
  //   { value: "option4", label: "Option 4" },
  //   { value: "option5", label: "Option 5" },
  //   { value: "option6", label: "Option 6" },
  // ];

  // const options3 = [
  //   { value: "option7", label: "Option 7" },
  //   { value: "option8", label: "Option 8" },
  //   { value: "option9", label: "Option 9" },
  // ];

  // const [value1, setValue1] = useState(null);
  // const [value2, setValue2] = useState(null);
  // const [value3, setValue3] = useState(null);

  // const handleOption1Change = (selectedOption) => {
  //   setValue1(selectedOption);
  //   getSubCategoryList(selectedOption[0].id);
  //   setValue2(null);
  //   setValue3(null);
  // };

  // const handleOption2Change = (selectedOption) => {
  //   setValue2(selectedOption);
  //   setValue3(null);
  // };

  // const handleOption3Change = (selectedOption) => {
  //   setValue3(selectedOption);
  // };

  // const fetchSubCatagoryList = (param?) => {
  //   const response = getHttp("categories/" + details.id + "/subcategories")
  //     .then((response) => {
  //       //console.log(response);

  //       setSubCategoryList(response); // handle success
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // handle error
  //     });
  // };
  const breadcrumbsPaths = [
    { label: "entities index", url: "/entitiesIndex" },
    { label: `${entity.name}`, url: `"/entitiesIndex/"${entity.name}` },
  ];
  return (
    <div className="enti-container1 content-top-margin">
      {/* <Breadcrumbs1 paths={breadcrumbsPaths} /> */}
      <SubHeader
        content={
          <div className="top-head">
            <div className="score-container">
              <Score score={entity.scoreValue} />
            </div>
            {/* <div className="entity-score-section">
            {" "}
            Entity Score - {entity.scoreValue} %
          </div> */}
            <div className="logo-container">
              <img
                className="logo"
                //src={require(`../../assets/${entityDetails.logo}`)}
                src={`data:image/png;base64,${entity.logo}`}
                alt=""
                //   width="50%"
                //   height="50%"
              />
            </div>
            <div className="heading main-heading">{entity.name}</div>
          </div>
        }
        showBreadcrumbs={true}
        breadCrumbsDetails={breadcrumbsPaths}
      />
      {/* <div>
        <Breadcrumbs />
      </div> */}
      {/* <div className="heading-cont"> */}
      {/* <div className="back-button" onClick={backButtonClicked}>
          <img
            src={require("../../assets/back.png")}
            alt=""
            width="50px"
            height="50px"
          />
        </div> */}
      {/* <div className="top-head">
          <div className="score-container">
            <Score score={entity.scoreValue} />
          </div>
          
          <div className="logo-container">
            <img
              className="logo"
              //src={require(`../../assets/${entityDetails.logo}`)}
              src={`data:image/png;base64,${entity.logo}`}
              alt=""
              //   width="50%"
              //   height="50%"
            />
          </div>
          <div className="heading main-heading">{entity.name}</div>
        </div> */}
      {/* </div> */}
      {/* <Breadcrumbs /> */}
      {/* <div className="drop-down-container">
        <DropDown
          isMulti={true}
          mainList={categoryList}
          onChangeDropDownItem={handleOption1Change}
          value={value1}
          //placeholder="Select an option"
        />
        {value1 && (
          <DropDown
            isMulti={true}
            mainList={subCategoryList}
            onChangeDropDownItem={handleOption2Change}
            value={value2}
            // placeholder="Select an option"
          />
        )}
        {value1 && value2 && (
          <DropDown
            isMulti={true}
            mainList={options3}
            onChangeDropDownItem={handleOption3Change}
            value={value3}
            // placeholder="Select an option"
          />
        )}
      </div> */}

      {entityDetails?.length > 0 && (
        <div className="top-section">
          <div className="donutDiv">
            {/* <DonutChart
              //details={chartDetails.data_analytics}
              heading={props.entityName + " skills"}
              details={roleCount}
            /> */}
            <div className="donut-div">
              <Doughnut
                heading={" Percentage of resource per category"}
                details={roleCount}
                showLegend={true}
              />
            </div>
            {entityCatSkillSet.length != 0 && (
              <div>
                <RadialBarChart
                  details={entityCatSkillSet}
                  heading={"Skill score per category "}
                />
              </div>
            )}
            {/* <MyChart /> */}
            {trainingDetails.showPopup && (
              <TrainingPopup
                employeDetails={thisEmployeeDetails}
                closeModal={() =>
                  setTrainingDetails({ ...trainingDetails, showPopup: false })
                }
                course={trainingDetails.details}
              />
            )}
            {showPopup && entityCatSkillSet && (
              <PopupModal
                employeDetails={thisEmployeeDetails}
                closeModal={() => setShowPopup(false)}
                score={entity.scoreValue}
              />
            )}
            <Popup
              isOpen={openPopup}
              onRequestClose={() => setOpenPopup(false)}
              onConfirm={(e) => handleSubmit(e)}
              bodyContent={<Certification data={employeeMoreDetils} />}
            />
          </div>
        </div>
      )}

      <div className="employeeList">
        <div className="employee-details-heading"></div>
        <table className="table">
          <thead>
            <tr className="each-column-border table-heading">
              <th className="each-column-border right-white-border">
                Resource Name
                <button
                  className={`up-down-button triangle-button ${
                    isUp ? "up" : "down"
                  }`}
                  onClick={() =>
                    handleSortClick("name", !isUp ? "asc" : "desc")
                  }
                >
                  <i
                    className={`up-down-button triangle-icon fas ${
                      isUp ? "fa-caret-up" : "fa-caret-down"
                    }`}
                  ></i>
                </button>
              </th>
              <th className="each-column-border right-white-border">Role</th>
              {/* <th className="each-column-border right-white-border">
                Nationality
              </th>
              <th className="each-column-border right-white-border">
                Experience in Yrs
              </th> */}
              {/* <th className="each-column-border">Skill </th> */}
              <th className="each-column-border right-white-border">
                Skill Score
                <button
                  className={`up-down-button triangle-button ${
                    isUp ? "up" : "down"
                  }`}
                  onClick={() =>
                    handleSortClick("score", !isScoreUp ? "asc" : "desc")
                  }
                >
                  <i
                    className={`triangle-icon fas ${
                      isScoreUp ? "fa-caret-up" : "fa-caret-down"
                    }`}
                  ></i>
                </button>
              </th>
              <th className="each-column-border">Details</th>
              <th className="each-column-border">More</th>
              {/* <th className="each-column-border">Training</th> */}
            </tr>
          </thead>
          <tbody>
            {entityDetails?.map((row, index) => (
              <tr
                key={index}
                // className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td className="each-column-border capitalise">{row.name}</td>
                <td className="each-column-border capitalise">{row.job}</td>
                {/* <td className="each-column-border capitalise">
                  {row?.otherDetails?.nationality}
                </td>
                <td className="each-column-border capitalise">
                  {row.otherDetails?.yearsOfExperience}
                </td> */}
                <td className="each-column-border capitalise">
                  {row.employeeSkill} %
                </td>

                {/* <td className="each-column-border">
                      <ProgressCircle
                        progress={row.skillToTalPercentage}
                        size={60}
                        strokeWidth={3}
                        circleOneStroke="white"
                        circleTwoStroke="#2b6cb0"
                        reverse="false"
                      />showThisEmployeeMoreDetails
                    </td> */}
                <td
                  className="each-column-border"
                  onClick={() => showThisEmployeeDetails(row)}
                >
                  {" "}
                  <img
                    src={require(`../../assets/eye.png`)}
                    alt=""
                    width="25px"
                    //   height="50%"
                  />
                </td>
                <td
                  className="each-column-border"
                  onClick={() => showThisEmployeeMoreDetails(row)}
                >
                  {" "}
                  <img
                    src={require(`../../assets/info.png`)}
                    alt=""
                    width="25px"
                    //   height="50%"
                  />
                </td>
                {/* <td
                  className="each-column-border"
                  onClick={() => traininigNeedOfEmployee(row)}
                >
                  View
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
