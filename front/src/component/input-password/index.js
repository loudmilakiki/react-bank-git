import "./index.css";
import React, { useState } from "react";

const InputPassword = ({
  label = "",
  type = "text",
  placeholder = "",
  isValid,
  errorMessage,
  onChange,
  value,
}) => {
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const togglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    setShowPassword((prevShow) => !prevShow);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    setInputValue(inputValue); // Добавьте эту строку
    setError(""); // Сброс ошибки при каждом изменении

    if (onChange) {
      onChange(inputValue);
    }
  };

  const validatePassword = () => {
    if (inputValue.length < 8) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <div className=" field--password">
      <label htmlFor={label} className="field__label"></label>

      <div className="field__wrapper">
        <input
          onChange={handleInputChange}
          onBlur={validatePassword}
          type={inputType}
          className="field__input"
          value={value}
          placeholder={placeholder}
        />
        <span
          onClick={togglePassword}
          className={`field__icon ${showPassword ? "show" : ""}`}
        ></span>
        {error && <span className="field__error">{error}</span>}
      </div>
    </div>
  );
};

export default InputPassword;
