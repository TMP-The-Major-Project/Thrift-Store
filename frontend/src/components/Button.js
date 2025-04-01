import React from 'react';
import './Button.css';

const Button = ({ onClickHandler, value, title, variant = 'primary', size = 'medium', disabled = false, loading = false, className = '' }) => {
  const buttonClasses = [
    'btns',
    variant,
    size !== 'medium' ? size : '',
    disabled ? 'disabled' : '',
    loading ? 'loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClickHandler}
      value={value}
      disabled={disabled || loading}
    >
      {title}
    </button>
  );
};

export default Button;
