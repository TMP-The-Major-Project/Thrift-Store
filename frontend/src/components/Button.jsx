import React from "react";
import "./Button.css";

const Button = ({ onClickHandler, value, title }) => {
  return (
    <button
      className="filter-button"
      onClick={() => onClickHandler(value)}
    >
      {title}
    </button>
  );
};

export default Button; 