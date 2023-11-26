import React from "react";

export const TextArea = ({ label, value, onChange, placeholder, name }) => {
  return (
    <div className="multiline-text-field display-flex">
      <label htmlFor={name} className="align-center">
        {label}
      </label>
      <textarea
        className="button-text-area lowercase"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4} // You can adjust the number of visible rows as needed
      />
    </div>
  );
};
