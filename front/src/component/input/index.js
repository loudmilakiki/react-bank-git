import "./index.css";
import React, { useState } from "react";

const Input = ({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  isValid,
  errorMessage,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;

    setInputValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        onChange={handleInputChange}
        type={type}
        className="field__input"
        name={name}
        id={name}
        placeholder={placeholder}
      />

      <div className={`form__error ${isValid ? "hidden" : ""}`}>
        {errorMessage}
      </div>
    </div>
  );
};

export default Input;
