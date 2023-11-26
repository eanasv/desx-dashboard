import React, { useEffect, useRef, useState } from "react";
import FilterSection from "../filterSection/FilterSection";

import "./Accordion.css";

interface accordionProps {
  onSelectedFilterValueChange: any;
  allEntities;
  changeFilter;
  name;
}

const Accordion: React.FC<accordionProps> = ({
  onSelectedFilterValueChange,
  allEntities,
  changeFilter,
  name,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const accordionRef = useRef(null); // Reference to the accordion container

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  //  <div ref={accordionRef}></div>
  return (
    <div>
      <div className="filter-button">
        <div onClick={handleButtonClick} className="accordion-button-container">
          <div className="plus-minus">
            {isExpanded ? (
              <img
                className="svg-image1"
                src={require("../../assets/minus.svg").default}
                alt="plus"
                // width="295px"
                // height="295px"
              />
            ) : (
              <img
                className="svg-image1"
                src={require("../../assets/plus.svg").default}
                alt="plus"
                // width="295px"
                // height="295px"
              />
            )}
          </div>
          <div className="plus-minus-text">
            {/* {isExpanded ? "Collapse" : "Expand"} */}
            {name}
          </div>
          {/* {isExpanded ? <div>Collapse</div> : <div>Expand</div>} */}
        </div>
      </div>
      {isExpanded && (
        <div className="expanded-div">
          {/* Content to be shown when expanded */}
          <FilterSection
            onSelectedValueChange={onSelectedFilterValueChange}
            allEntities={allEntities}
            changeFilter={changeFilter}
            name={name}
          />
        </div>
      )}
    </div>
  );
};

export default Accordion;
