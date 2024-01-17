import "./index.css";
import React, { useState } from "react";

const InputPassword = ({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  defaultValue = "",
  value = "",
  errorMessage = "",
}) => {
  const [inputType, setInputType] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [error, setError] = useState("");

  const togglePassword = () => {
    console.log("Toggle password clicked");
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    setShowPassword((prevShow) => !prevShow);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue(value);
  };

  const validatePassword = () => {
    // Ваша логика валидации пароля
    if (inputValue.length < 8) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <div className=" field--password">
      <label htmlFor={name} className="field__label"></label>

      <div className="field__wrapper">
        <input
          onChange={handleChange}
          onBlur={validatePassword}
          type={inputType}
          className="field__input validation"
          name={name}
          value={inputValue}
          placeholder={placeholder}
          autocomplete="new-password"
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
