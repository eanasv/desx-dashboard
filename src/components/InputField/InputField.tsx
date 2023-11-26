import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import "./InputField.css";

interface inputProps {
  type?;
  label;
  value;
  onChange;
  onBlur?;
  name;
  placeholder;
}

export const InputField: React.FC<inputProps> = ({
  type,
  label,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
}) => {
  return (
    <div className="display-flex">
      <div className="align-center">{label}</div>
      <input
        type={!type ? "text" : type}
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        className="button lowercase"
        required
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
