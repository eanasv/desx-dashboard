import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./EntityList.css";
import EntityBox from "../../components/entityBox/EntityBox";
import FilterSection from "../../components/filterSection/FilterSection";
import { getHttp } from "../../service/APIRequest";
import Accordion from "../../components/accordion/Accordion";
import { SubHeader } from "../../components/subHeader/SubHeader";

export const EntityList = (props) => {
  const history = useHistory();
  var loginStatus = sessionStorage.getItem("loginStatus");

  if (loginStatus == null || loginStatus == "") {
    history.push("/login");
  }
  var userDeatilsString = sessionStorage.getItem("userDetails");
  var userDetailsObj = JSON.parse(userDeatilsString);

  const [userInfo, setuserInfo] = useState({
    name: userDetailsObj.name,
    email: userDetailsObj.email,
    role: userDetailsObj.role,
    entity: userDetailsObj.entity,
  });
  const [updatedAllEntityList, setupdatedAllEntityList] = useState<any>();
  const [entityListForDropDown, setentityListForDropDown] = useState<any>();
  const [filterByName, setfilterByName] = useState("asc");

  useEffect(() => {
    getEntityList(filterByName);
  }, []);

  const getEntityList = async (filterByName?) => {
    const response = await getHttp("entity/getAll", {
      filter: filterByName,
      entityName: userInfo.role == "main_admin" ? "" : userInfo.entity,
    }); //
    // const response = await getHttp("auth/welcome");
    await setupdatedAllEntityList(response);
    //getDropdownEntityList();
    setentityListForDropDown(response);
  };
  //

  const filterEntity = (filterBy, item) => {
    if (item == "name")
      if (filterBy) {
        getEntityList("asc");
      } else {
        getEntityList("desc");
      }
    else {
      if (filterBy) {
        getEntityList("ascScore");
      } else {
        getEntityList("descScore");
      }
    }
  };

  const changeDisplaySetData = (data) => {
    setupdatedAllEntityList(data);
  };

  const goToEntityDetails = (entityName, score, logo) => {
    //props.onEntityClick(entityName, score, logo);
    history.push("/entitiesIndex/" + entityName, {
      name: entityName,
      scoreValue: score,
      logo: logo,
    });
  };
  return (
    <div className="content-top-margin">
      {!updatedAllEntityList ? (
        <div className="loader"></div>
      ) : (
        <div>
          {/* <FilterSection
            onSelectedValueChange={changeDisplaySetData}
            allEntities={entityListForDropDown}
            changeFilter={filterEntity}
          /> */}
          <SubHeader pageHeadding="Entities index" />
          <div className="main-content-top-margin"></div>
          <div className="content-container">
            <div className="entity-container">
              {updatedAllEntityList?.map((item, index) => (
                <div
                  key={index}
                  className="each-entity-container"
                  onClick={() =>
                    goToEntityDetails(
                      item.label,
                      Math.round(
                        updatedAllEntityList[index].totalSkillPercentage
                      ),
                      updatedAllEntityList[index].image
                    )
                  }
                >
                  <EntityBox
                    logo={updatedAllEntityList[index].image}
                    name={updatedAllEntityList[index].label}
                    totalEntityScore={Math.round(
                      updatedAllEntityList[index].totalSkillPercentage
                    )}
                  />
                </div>
              ))}
            </div>
            {(userDetailsObj.role == "main_admin" ||
              userDetailsObj.role == "desc_user") && (
              <div className="accordion-filter">
                <div className="each-accordion">
                  <Accordion
                    onSelectedFilterValueChange={changeDisplaySetData}
                    allEntities={entityListForDropDown}
                    changeFilter={filterEntity}
                    name="filter"
                  />
                </div>
                <div>
                  <Accordion
                    onSelectedFilterValueChange={changeDisplaySetData}
                    allEntities={entityListForDropDown}
                    changeFilter={filterEntity}
                    name="sort"
                  />
                </div>
                {/* <FilterSection
                onSelectedValueChange={changeDisplaySetData}
                allEntities={entityListForDropDown}
                changeFilter={filterEntity}
              /> */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
