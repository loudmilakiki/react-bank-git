import "./index.css";
import React, { useState, useCallback, isValidElement } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { Link } from "react-router-dom";
import InputPassword from "../../component/input-password";
import Input from "../../component/input";
//import { SignupForm } from "../../utils/form";
import { useNavigate } from "react-router-dom";
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../utils/form.js";

const SignupPage = ({ title, description }) => {
  const navigate = useNavigate();

  const FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "passwordAgain",
  };

  const FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення приберіть зайве",
    EMAIL: "Введіть коректне значення email адреси",
    PASSWORD:
      "Пароль має складатися не менше ніж з 8 символів, включаючи хоча б одну цифру, малу чи велику літеру",
    CONFIRM_PASSWORD: "Ваш другий пароль не збігається з першим",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = (name, value) => {
    if (String(value).length < 1) {
      return FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return FIELD_ERROR.IS_BIG;
    }

    if (name === FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) return FIELD_ERROR.EMAIL;
    }

    if (name === FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) return FIELD_ERROR.PASSWORD;
    }

    if (name === FIELD_NAME.CONFIRM_PASSWORD) {
      if (String(value) !== formData.password) {
        return FIELD_ERROR.CONFIRM_PASSWORD;
      }
    }
  };
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidPasswordConfirmation, setIsValidPasswordConfirmation] =
    useState(true);
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const validateEmail = (formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData) ? null : "Введите корректный email";
  };

  const validatePassword = (formData) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // return passwordRegex.test(formData);
    const isValid = passwordRegex.test(formData.password);
    setIsPasswordValid(isValid);
    return isValid;
  };
  // перевірка підтвердження валідації
  const validateForm = () => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData);
    const isPasswordConfirmationValid =
      formData.password === formData.confirmPassword;

    return {
      isEmailValid,
      isPasswordValid,
      isPasswordConfirmationValid,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const validationResult = validate(name, value);

    setErrorMessage(validationResult);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form...");

    const { isEmailValid, isPasswordValid, isPasswordConfirmationValid } =
      validateForm();

    console.log("Before confirmation code generation");
    const confirmationCode = Math.floor(1000 + Math.random() * 9000);
    const userConfirmed = window.confirm(
      `Your confirmation code is: ${confirmationCode}. Proceed?`
    );
    console.log("After confirmation code generation");

    if (userConfirmed) {
      try {
        const response = await fetch("http://localhost:3001/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            confirmationCode: confirmationCode,
          }),
        });

        if (response.ok) {
          console.log("User registered successfully");
          navigate("/signup-confirm");
        } else {
          console.error("Error during registration:", response.status);
          const result = await response.json();
          console.error("Server response error:", result.error);
          setErrorMessage(result.error);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setErrorMessage("Error processing server response");
      }
    }
  };

  return (
    <Page>
      <Status />
      <Back />

      <div className="section">
        <h1 className="title-up">{title}</h1>
        <p className="descr">{description}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="form__item">
            <Input
              action="signupForm.change"
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              isValid={isEmailValid}
              //value={email}
            />
            {errorMessage && (
              <span className="form__error">{errorMessage}</span>
            )}
          </div>

          {/* <Input label="password" type="password" placeholder="your password" /> */}

          <div className="input">
            <span>Password</span>

            <InputPassword
              action="signupForm.change"
              type="password"
              label="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              isValid={isPasswordValid === true}
              errorMessage="Password must be longer then 8 number"
            />
          </div>

          <span>Confirm Password</span>

          <InputPassword
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            isPasswordConfirmationValid={isValidPasswordConfirmation}
            errorMessage="Password error"
          />

          <span name="confirmPassword" className="form__error">
            Password do not match
          </span>

          <span>
            Already have an account?
            <Link className="account" to="/signin">
              Sign In
            </Link>
          </span>

          <button
            type="submit"
            className="button-signup"
            // onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </form>
      {/* <div className="alert alert--error">
        <span className="danger">
          <img src="./img/danger.png" /> A user with the same name is already
          exist
        </span>
      </div>   */}

      <div className="indicator-up">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default SignupPage;
