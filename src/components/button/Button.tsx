import React from "react";
import "./Button.css";

const Button = ({ icon, text, isActive, onClick }) => {
  return (
    <button
      className={["filterButton std1 ", isActive ? "active" : ""].join(" ")}
      onClick={onClick}
    >
      {text && <span className="text">{text}</span>}
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
