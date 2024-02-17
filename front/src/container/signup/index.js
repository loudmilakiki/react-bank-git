import "./index.css";
import React, { useState, useEffect } from "react";
//import { inputPassword, SignupForm } from "../../utils/form";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../component/input-password";
import Input from "../../component/input";
import { SignupForm } from "../../utils/AuthContext";
import { useAuth } from "../../utils/AuthContext";
import { REG_EXP_PASSWORD, REG_EXP_EMAIL } from "../../utils/form";

const SignupPage = ({ title, description }) => {
  const navigate = useNavigate();
  const { authDispatch } = useAuth();

  const { value, error, disabled, submit, initialize } = SignupForm;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  //const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isValidPasswordConfirmation, setIsValidPasswordConfirmation] =
    useState(true);

  useEffect(() => {
    console.log(
      "Email:",
      email,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword
    );
  }, [email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!REG_EXP_EMAIL.test(email)) {
      setIsEmailValid(false);
      setErrorMessage("Enter a valid email");
      return;
    }

    if (!REG_EXP_PASSWORD.test(password)) {
      setIsPasswordValid(false);
      setErrorMessage("Password must be longer than 8 characters");
      return;
    }

    if (confirmPassword !== password) {
      setIsValidPasswordConfirmation(false);
      setErrorMessage("Password mismatch");
      return;
    }

    const generateConfirmationCode = () => {
      const confirmationCode = Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(confirmationCode.toString());
      console.log("Generated Confirmation Code:", confirmationCode);
      return confirmationCode;
    };

    const confirmationCode = generateConfirmationCode();

    const userConfirmed = window.confirm(
      `Your confirmation code is: ${confirmationCode}. Proceed?`
    );

    if (userConfirmed) {
      console.log(
        "Before fetch - Email:",
        email,
        "Password:",
        password,
        "Confirmation Code:",
        confirmationCode
      );
      try {
        const response = await fetch(`http://localhost:4000/api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
            confirmationCode,
          }),
        });

        if (response.ok) {
          console.log("User registered successfully");
          setErrorMessage("");
          const token = "your_generated_token_here"; // Полученный от сервера токен
          authDispatch({
            type: "LOGIN",
            payload: { token, user: { email } },
          });

          navigate("/signup-confirm", { state: { email, confirmationCode } });
        } else {
          const errorText = await response.text();
          console.error("Server error:", errorText);
          setErrorMessage(errorText || "Server error");
        }

        console.log(
          "Request data:",
          JSON.stringify({ email, password, confirmPassword, confirmationCode })
        );
      } catch (error) {
        console.error("Error during fetch:", error);
        setErrorMessage("Error processing server response:" + error.message);
      }
    }
  };

  return (
    <>
      <div className="section">
        <h1 className="title-up">{title}</h1>

        <p className="descr">{description}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form">
          <span className="form__error">Error</span>

          <Input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={(value) => setEmail(value)}
            isValid={isEmailValid}
            value={email}
            errorMessage={isEmailValid ? "" : "Enter a valid email"}
          />

          <span>Password</span>

          <InputPassword
            type="password"
            label="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isValid={isPasswordValid}
            autoComplete="new-password"
            errorMessage={
              isPasswordValid ? "" : "Password must be longer than 8 characters"
            }
          />

          <span> Password again</span>

          <InputPassword
            type="password"
            label="Confirm password"
            placeholder="Password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            autoComplete="new-password"
            isPasswordConfirmationValid={isValidPasswordConfirmation}
            errorMessage={
              isValidPasswordConfirmation
                ? ""
                : "Password mismatch. Please make sure the passwords match."
            }
          />
        </div>

        {/* <span name="confirmPassword" className="form__error">
          {SignupForm.error[SignupForm.FIELD_NAME.EMAIL]}
        </span> */}

        <span>
          <div className="account-info">
            Already have an account?
            <Link className="account" to="/signin">
              Sign In
            </Link>
          </div>
        </span>

        {errorMessage.confirmPassword && (
          <span className="danger">{errorMessage.confirmPassword}</span>
        )}

        <button className="button button--disabled" type="submit">
          Continue
        </button>
        <span className="alert alert--disabled">Error</span>

        <div className="alert alert--error">
          <span className="danger">
            <img src="./img/danger.png" alt="icon" />
            {errorMessage}
          </span>
        </div>
      </form>

      <div className="indicator-up">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </>
  );
};

export default SignupPage;
