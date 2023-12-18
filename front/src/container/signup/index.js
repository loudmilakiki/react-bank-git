import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { Link } from "react-router-dom";
import InputPassword from "../../component/input-password";

const SignupPage = () => {
  const [email, setEmail] = useState("");

  return (
    <Page>
      <Status />
      <Back />

      <div className="content-up">
        <div className="section">
          <h1 className="title-up">Sign up</h1>
          <p className="descr">Choose a registration method</p>
        </div>

        <div className="action">
          <div className="input">
            <span>Email</span>
            <input
              className="input-signup-email"
              placeholder="email"
              label="Email"
              type="email"
            />
          </div>

          {/* <Input label="password" type="password" placeholder="your password" /> */}

          <div className="input">
            <span>Password</span>

            <InputPassword
              action="signupForm.change"
              type="password"
              value=""
              label="password"
              placeholder="password"
            />
          </div>
          <span>Confirm Password</span>

          <InputPassword
            type="password"
            value=""
            label="Confirm password"
            placeholder="Confirm password"
          />

          {/* <div className="pass">
            <span>Confirm Password</span>
            <input
              className="input-signup-password"
              placeholder="Confirm password"
              label="Confirm Password"
              type="Confirm password"
            />
          </div> */}

          <span className="form__error">Error</span>

          <span>
            Already have an account?
            <Link className="account" to="/signin">
              Sign In
            </Link>
          </span>

          <div className="buttons-up">
            <button
              onClick="SignupForm.change"
              className="button-signup"
              type="button"
            >
              <Link className="account-link" to="/signup-confirm">
                Continue
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="alert alert--error">
        <span className="danger">
          <img src="./img/danger.png" /> A user with the same name is already
          exist
        </span>
      </div>

      <div className="indicator-up">
        <img src="/img/indicator.png" />
      </div>
    </Page>
  );
};

export default SignupPage;
