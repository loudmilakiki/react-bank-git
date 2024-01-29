import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import Input from "../../component/input";
import { useNavigate } from "react-router-dom";

const RecoveryPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSendCode = async (event) => {
    event.preventDefault();

    if (isEmailValid) {
      const confirmationCode = Math.floor(1000 + Math.random() * 9000);
      const userConfirmed = window.confirm(
        `Your confirmation code is: ${confirmationCode}. Proceed?`
      );
    }

    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    if (!isEmailValid) {
      setErrorMessage("Помилка введених даних");
      return;
    }

    if (userConfirmed) {
      navigate(`/recovery-confirm`);
    } else {
      console.log("User cancelled the operation");
    }

    // if (!email.trim()) {
    //   console.error("Email cannot be empty");
    //   return;
    // }

    try {
      const response = await fetch(`http://localhost:4000/api/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Code sent successfully");

        const userConfirmed = window.confirm(
          `Your confirmation code is: ${confirmationCode}. Proceed?`
        );

        if (userConfirmed) {
          navigate(`/recovery-confirm`);
        } else {
          console.log("User cancelled the operation");
        }
      } else {
        // Обработка ошибок, если не удалось отправить код
        console.error("Failed to send code:", response.status);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // const isValidEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  return (
    <Page>
      <Status />
      <Back />
      <div className="content-rec">
        <div className="recovery">
          <h1 className="title-up">Recover password</h1>
          <p className="descr">Choose a registration method</p>
        </div>

        <form onSubmit={handleSendCode}>
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
                required
              />
              <div className="form__error" style={{ color: "#F23152" }}>
                {emailError}
              </div>
            </div>

            <div className="buttons-rec">
              <button className="button-recovery" type="submit">
                Send code
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="indicator-rec">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default RecoveryPage;
