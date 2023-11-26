import React from "react";
import store from "../../redux/Store";

interface simpleDrodropdownOption {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  name: string;
  userDetails?: any;
}
export const SimpleDropDown: React.FC<simpleDrodropdownOption> = ({
  label,
  value,
  onChange,
  options,
  name,
  userDetails,
}) => {
  console.log(userDetails);

  return (
    <div className="display-flex">
      <div className="align-center">{label}</div>
      <select
        className="new-user button"
        value={value}
        onChange={onChange}
        required
        name={name}
        disabled={userDetails?.role == "user"}
      >
        <option value="">Select {label}</option>
        {options?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
