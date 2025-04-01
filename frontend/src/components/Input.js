import React from 'react';
import './Input.css';

const Input = ({ handleChange, value, title, name, color, size = 'medium', disabled = false, className = '' }) => {
  const labelClasses = [
    size !== 'medium' ? size : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-container">
      <input
        type="radio"
        onChange={handleChange}
        value={value}
        name={name}
        disabled={disabled}
      />
      <label 
        htmlFor={name}
        className={labelClasses}
        data-color={color}
      >
        <span>{title}</span>
      </label>
    </div>
  );
};

export default Input;
