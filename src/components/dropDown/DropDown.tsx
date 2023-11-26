import React, { useEffect, useState } from "react";
import { getHttp } from "../../service/APIRequest";
import "./DropDown.css";
import Select from "react-select";

interface dropDownType {
  onChangeDropDownItem?: any;
  mainList?: any;
  name?: String;
  isMulti: boolean;
  value?: any;
  classname?: String;
  placeholder?: String;
}
const DropDown: React.FC<dropDownType> = ({
  onChangeDropDownItem,
  mainList,
  name,
  isMulti,
  value,
  classname,
  placeholder,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(null);

  useEffect(() => {
    setSelectedOptions(mainList);
  }, [mainList]);

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    onChangeDropDownItem(data);
  }
  return (
    <div>
      <div className="app">
        <div className="dropdown-heading"> {name}</div>
        <div className="dropdown-container">
          <Select
            options={mainList}
            isMulti={isMulti}
            placeholder={placeholder ? placeholder : "by entity"} //{`Select ${name}`}
            onChange={handleSelect}
            isSearchable={true}
            className={`dropdownOption button1 ${classname}`}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};
export default DropDown;
