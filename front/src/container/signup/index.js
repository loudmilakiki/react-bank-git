import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { Link } from "react-router-dom";
import InputPassword from "../../component/input-password";
import Input from "../../component/input";
//import { SignupForm } from "../../utils/form";
import { useNavigate } from "react-router-dom";
//import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../utils/form.js";

const SignupPage = ({ title, description }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  //const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isValidPasswordConfirmation, setIsValidPasswordConfirmation] =
    useState(true);
  const [confirmationCode, setConfirmationCode] = useState("");
  // const [errors, setErrors] = useState({
  //   email: null,
  //   password: null,
  //   confirmPassword: null,
  // });
  // // const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    setIsEmailValid(isEmailValid);

    const isPasswordValid = validatePassword(password);
    setIsPasswordValid(isPasswordValid);

    // const isPasswordConfirmationValid = password === confirmPassword;
    // setIsValidPasswordConfirmation(isPasswordConfirmationValid);

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(confirmationCode.toString());

    const userConfirmed = window.confirm(
      `Your confirmation code is: ${confirmationCode}. Proceed?`
    );

    if (userConfirmed) {
      try {
        const response = await fetch(`http://localhost:4000/api/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirmationCode,
          }),
        });

        if (response.ok) {
          console.log("User registered successfully");
          navigate("/signup-confirm", { state: { confirmationCode } });
        } else {
          try {
            const errorResponse = await response.json();
            console.error("Server error:", errorResponse);
            setErrorMessage(errorResponse.message || "Server error");
          } catch (error) {
            console.error("Error parsing JSON in server response:", error);
            setErrorMessage(
              "Error processing server response:" + error.message
            );
          }
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setErrorMessage("Error processing server response:" + error.message);
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
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              isValid={isEmailValid}
              value={email}
            />
            {errorMessage && errorMessage.email && (
              <span className="form__error">{errorMessage.email}</span>
            )}
          </div>

          <div className="input">
            <span>Password</span>

            <InputPassword
              action="signupForm.change"
              type="password"
              label="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              isValid={isPasswordValid}
              errorMessage="Password must be longer then 8 number"
            />
          </div>

          <span>Confirm Password</span>

          <InputPassword
            type="password"
            label="Confirm password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            isPasswordConfirmationValid={isValidPasswordConfirmation}
            errorMessage="Password error"
            //onChange={handleConfirmPasswordChange}
          />

          <span name="confirmPassword" className="form__error">
            {!isValidPasswordConfirmation && "Password do not match"}
          </span>

          <span>
            Already have an account?
            <Link className="account" to="/signin">
              Sign In
            </Link>
          </span>

          <button type="submit" className="button-signup">
            Continue
          </button>
        </div>
      </form>
      <div className="alert alert--error">
        <span className="danger">
          <img src="./img/danger.png" alt="icon" />
          {errorMessage}
        </span>
      </div>
      {errorMessage && (
        <div className="alert alert--error">
          <span className="danger">
            {/* <img src="./img/danger.png" alt="icon" />*/}{" "}
            {errorMessage.password}
          </span>
        </div>
      )}

      {errorMessage.confirmPassword && (
        <div className="alert alert--error">
          <span className="danger">
            {/* <img src="./img/danger.png" alt="icon" />{" "} */}
            {errorMessage.confirmPassword}
          </span>
        </div>
      )}

      <div className="indicator-up">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default SignupPage;
