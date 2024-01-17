import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Input from "../../component/input";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordTooSimple, setPasswordTooSimple] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToSignupConfirm, setRedirectToSignupConfirm] = useState(false);

  const { authState, authDispatch } = useAuth();
  const { token } = authState;
  const navigate = useNavigate();
  const { updateUserData } = useAuth();

  const validateEmail = (value) => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Enter correct email";
  };

  // const handleChange = (e) => {
  //   //const { name, value } = e.target;
  //   // const validationResult = validate(name, value);
  //   // setErrorMessage(validationResult);
  //   // setFormData({
  //   //   ...formData,
  //   //   [name]: value,
  //   // });
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSigninClick = async () => {
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    // if (password.length < 8) {
    //   setPasswordTooSimple(true);
    //   setPasswordError("Password is too simple");
    //   return;
    // }

    if (!isEmailValid) {
      setErrorMessage("Enter correct email");
      setEmailError("Enter correct email");
      return;
    }

    const user = { email, password, confirm: true, token: "your_token_here" };

    if (!user.confirm) {
      setRedirectToSignupConfirm(true);
    } else {
      // const signinResult = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/signin/?email=${email}&password=${password}`
        );
        const data = await res.json();

        if (res.ok) {
          // setErrorMessage("");

          const token = Math.random().toString(36).substring(2, 16);

          const user = { email, password, confirm: true, token };

          authDispatch({ type: "LOGIN", payload: { token, user } });

          const userData = { email, password };
          updateUserData(userData);

          if (authState.user && authState.user.confirm) {
            navigate("/balance");
          } else {
            setRedirectToSignupConfirm(true);
          }
        }
      } catch (error) {
        console.error("Error signing in:", error);
        setErrorMessage("Error signing in");
      }
    }
  };

  return (
    <Page>
      <Status />
      <Back />

      <div className="content-in">
        <div className="section">
          <h1 className="title-up">Sign in</h1>
          <p className="descr">Sign in Select login method</p>
        </div>

        <form onSubmit={handleSigninClick}>
          <div className="form">
            <div className="form__item">
              <Input
                action="signupForm.change"
                label="Email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              <div className="form__error" style={{ color: "#F23152" }}>
                {emailError}
              </div>
            </div>

            <div className="pass">
              <span className="password">Password</span>
              <input
                className="input-signin-password"
                placeholder="password"
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <div className="form__error" style={{ color: "#F23152" }}>
                {passwordError}
              </div>
            </div>
            {isPasswordTooSimple && (
              <span className="simple">Sorry, the password is too simple</span>
            )}
            <span>
              Forgot your password?{" "}
              <Link className="click-in" to="/signin/recovery">
                Restore
              </Link>
            </span>

            <div className="buttons-in">
              {/* <button className="button-signin" onClick={handleSigninClick}>
                <Link className="click-rec" to="/balance">
                  Continue
                </Link>
              </button> */}

              <button
                className="button-signin"
                onClick={() => navigate("/balance")}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="indicator-in">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
      {redirectToSignupConfirm && <navigate to="/signup-confirm" />}
    </Page>
  );
};

export default SigninPage;
