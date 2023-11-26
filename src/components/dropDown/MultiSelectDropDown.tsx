import React, { useState } from "react";

const MultiSelectDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  const handleSelect = (e) => {
    const value = e.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div>
      <label>Select options:</label>
      <select multiple={true} value={selectedOptions} onChange={handleSelect}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p>Selected options: {selectedOptions.join(", ")}</p>
    </div>
  );
};

export default MultiSelectDropdown;
