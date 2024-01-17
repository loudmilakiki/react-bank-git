import Page from "../../component/page";
import "./index.css";
import Status from "../../component/status";
import Back from "../../component/back-button";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";

const SignupConfirmPage = () => {
  const { authDispatch } = useAuth();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  //const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const confirmAccount = async () => {
    console.log("Attempting to confirm account...");
    try {
      const response = await fetch(
        "http://localhost:4000/api/confirm-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            confirmationCode,
          }),
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Response is OK");
        const result = await response.json();

        // Обновление пользователя и токена в контексте аутентификации
        authDispatch({
          type: "LOGIN",
          payload: {
            user: result.updatedUser,
            token: result.updatedToken,
          },
        });

        console.log("Before navigate to /balance");
        navigate("/balance");
        console.log("After navigate to /balance");
        // } else if (response.status === 401) {
        //   console.log("Unauthorized (401)");
        //   navigate("/signup");
      } else {
        const errorResult = await response.json();
        console.error("Server error:", errorResult);
        setErrorMessage(errorResult.error);
        setIsValidCode(false);
      }
    } catch (error) {
      console.error("Error confirming account:", error);
      setErrorMessage("Error confirming account");
      setIsValidCode(false);
    }
  };

  const handleConfirm = () => {
    console.log("Handling confirmation...");
    const trimmedCode = confirmationCode.trim();
    const isCodeValid = !!trimmedCode;

    if (!isCodeValid) {
      setIsValidCode(false);
      setErrorMessage("Введено невірний код");
    } else {
      confirmAccount();
    }
  };

  return (
    <Page>
      <Status />
      <Back />

      <div className="content-con">
        <div className="section">
          <h1 className="title-up">Recover password</h1>
          <p className="descr">Choose a registration method</p>
        </div>

        <div className="action-con">
          <div className="input">
            <span>Code</span>
            <input
              className="input-confirm-code"
              placeholder="code"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
          </div>

          {!isValidCode && (
            <div className="error-message">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="buttons-con">
            {/* <Link className="confirm-link" to="/balance"> */}
            <button className="button-confirm" onClick={handleConfirm}>
              Confirm
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>

      <div className="indicator-con">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default SignupConfirmPage;
