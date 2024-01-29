import Page from "../../component/page";
import "./index.css";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useLocation } from "react-router-dom";

const SignupConfirmPage = () => {
  const { login } = useAuth();
  const [confirmationCode, setConfirmationCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const confirmationCodeFromSignup =
    (location.state && location.state.confirmationCode) || "";

  // const confirmAccount = async () => {
  //   console.log("Attempting to confirm account...");
  //   try {
  //     const response = await fetch("http://localhost:4000/api/signup-confirm", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: userEmail,
  //         password: userPassword,
  //         confirmationCode,
  //       }),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Updated user:", result.updatedUser);
  //       console.log("Updated token:", result.updatedToken);

  //       login({
  //         type: "LOGIN",
  //         payload: {
  //           user: result.updatedUser,
  //           token: result.updatedToken,
  //         },
  //       });
  //       console.log("Navigating to /balance");
  //       navigate("/balance");
  //     } else {
  //       const errorResult = await response.json();
  //       console.error("Server error:", errorResult);
  //       setErrorMessage(errorResult.error);
  //       setIsValidCode(false);
  //     }
  //   } catch (error) {
  //     console.error("Error confirming account:", error);
  //     setErrorMessage("Error confirming account");
  //     setIsValidCode(false);
  //   }
  // };

  const confirmAccount = async () => {
    console.log("Attempting to confirm account...");
    console.log("Data to be sent:", {
      confirmationCode,
      confirmationCodeFromSignup,
    });

    try {
      const response = await fetch("http://localhost:4000/api/signup-confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          confirmationCode: confirmationCodeFromSignup,
        }),
      });

      const result = await response.json();

      console.log("Server response:", result);

      if (response.ok) {
        if (result.message === "Подтверждение успешно") {
          console.log("Confirmation successful!");

          // Переход на страницу баланса только при успешном подтверждении
          navigate("/balance");

          // Проверяем, есть ли информация о пользователе
          if (result.updatedUser) {
            console.log("Updated user:", result.updatedUser);
            console.log("Updated token:", result.updatedToken);

            // Обновление пользователя и токена в контексте аутентификации
            login({
              type: "LOGIN",
              payload: {
                user: result.updatedUser,
                token: result.updatedToken,
              },
            });
          } else {
            // Дополнительная логика, если нет информации о пользователе
            console.log("No updated user information received.");
          }
        } else {
          // Обработка неуспешного подтверждения
          console.error("Server error:", result.message);
          setErrorMessage(result.message);
          setIsValidCode(false);
        }
      } else {
        // Обработка ошибки на сервере
        console.error("Server error:", result.message);
        setErrorMessage(result.message);
        setIsValidCode(false);
      }
    } catch (error) {
      // Обработка ошибки fetch
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
            <button className="button-confirm" onClick={confirmAccount}>
              Confirm
            </button>
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
