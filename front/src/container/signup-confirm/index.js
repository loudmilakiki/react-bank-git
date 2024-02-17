import Page from "../../component/page";
import "./index.css";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
//import { useAuth } from "../../utils/AuthContext";
//import { useLocation } from "react-router-dom";

const SignupConfirmPage = () => {
  const navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  // Вызовите ваши функции здесь

  const submit = async () => {
    console.log("Email:", email);
    console.log("Confirmation Code:", confirmationCode);
    console.log("Attempting to confirm account...");

    if (!isValidCode) {
      setErrorMessage("Введено невірний код");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          confirmationCode,
        }),
      });

      const result = await response.json();

      console.log("Ответ сервера:", result);

      if (response.ok) {
        if (result.message === "Подтверждение успешно") {
          console.log("Confirmation successful!");
          navigate("/balance");
        } else {
          console.error("Server error:", result.message);
          setErrorMessage(result.message);
          setIsValidCode(false);
        }
      } else {
        console.error("Server error:", result.message);
        setErrorMessage(result.message);
        setIsValidCode(false);
      }
    } catch (error) {
      console.error("Error confirming account:", error);
      setErrorMessage("Error confirming account");
      setIsValidCode(false);
    }
  };

  return (
    <Page>
      <Status />
      <Back />

      <div className="content-con">
        <div className="section">
          <h1 className="title-up">Confirm Registration</h1>
          <p className="descr">
            Enter the confirmation code sent to your email
          </p>
        </div>

        <div className="action-con">
          <div className="input">
            <span>Code</span>
            <input
              className="input-confirm-code"
              placeholder="Enter code"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              errorMessage="Введено невірний код"
            />
          </div>

          <div className="buttons-con">
            <button className="button-confirm" onClick={submit}>
              Confirm
            </button>
            {!isValidCode && (
              <div className="error-message">
                <span>{errorMessage}</span>
              </div>
            )}
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
