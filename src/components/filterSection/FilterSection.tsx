import React, { useEffect, useState } from "react";
import Button from "../button/Button";

import DropDown from "../dropDown/DropDown";
import "./FilterSection.css";

interface filterSectionProps {
  onSelectedValueChange: any;
  allEntities;
  changeFilter: any;
  name?: any;
}

const FilterSection: React.FC<filterSectionProps> = ({
  onSelectedValueChange,
  allEntities,
  changeFilter,
  name,
}) => {
  const [entityList, setentityList] = useState(allEntities);

  useEffect(() => {
    setentityList(allEntities);
  }, [allEntities]);

  const handleChangeValue = (data) => {
    if (data.length === 0) {
      //setentityList(mainEntity);
      onSelectedValueChange(entityList);
    } else {
      onSelectedValueChange(data);
    }
  };

  const [isNameAscending, setIsNameAscending] = useState(true);
  const [isScoreAsc, setisScoreAsc] = useState(true);

  const handleFilterClick = () => {
    setIsNameAscending(!isNameAscending);
    changeFilter(!isNameAscending, "name");
  };

  const handleFilterClickScore = () => {
    setisScoreAsc(!isScoreAsc);
    changeFilter(!isScoreAsc, "score");
  };

  const filterIcon =
    isNameAscending || isScoreAsc ? (
      <i className="fas fa-arrow-up"></i>
    ) : (
      <i className="fas fa-arrow-down"></i>
    );

  return (
    <div className="all-filter-container">
      {name == "filter" && (
        <DropDown
          mainList={entityList}
          //name="Filter"
          onChangeDropDownItem={handleChangeValue}
          isMulti={true}
        />
      )}
      {/* <div>
        <div className="sort-button">Sort</div>
        <Button
          icon={
            !isNameAscending ? (
              <i className="fas fa-arrow-up"></i>
            ) : (
              <i className="fas fa-arrow-down"></i>
            )
          }
          text="By Name"
          isActive={isNameAscending}
          onClick={handleFilterClick}
        />
      </div>
      <Button
        icon={
          !isScoreAsc ? (
            <i className="fas fa-arrow-up"></i>
          ) : (
            <i className="fas fa-arrow-down"></i>
          )
        }
        text="By score"
        isActive={isScoreAsc}
        onClick={handleFilterClickScore}
      /> */}
      {name == "sort" && (
        <>
          <div>
            {/* <div className="sort-button">Sort</div> */}
            <Button
              icon={
                !isNameAscending ? (
                  <i className="fas fa-arrow-up"></i>
                ) : (
                  <i className="fas fa-arrow-down"></i>
                )
              }
              text="By Name"
              isActive={isNameAscending}
              onClick={handleFilterClick}
            />
          </div>
          <Button
            icon={
              !isScoreAsc ? (
                <i className="fas fa-arrow-up"></i>
              ) : (
                <i className="fas fa-arrow-down"></i>
              )
            }
            text="By score"
            isActive={isScoreAsc}
            onClick={handleFilterClickScore}
          />
        </>
      )}
    </div>
  );
};

export default FilterSection;
