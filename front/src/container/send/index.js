import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { useNavigate } from "react-router-dom";

const SendPage = () => {
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(1000);
  const [sum, setSum] = useState("");
  const [userConfirmed, setUserConfirmed] = useState(false);
  const navigate = useNavigate();
  const [isValidSum, setIsValidSum] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let senderTransaction,
    senderNotification,
    recipientTransaction,
    recipientNotification;

  const validateSum = (sum) => {
    const regex =
      /^(?!$|\s)(?:(?!^0\.00$)^\d{1,6}(?:\.\d{1,2})?$|^(?!^0$)\d{1,6}$)/;

    return (
      regex.test(sum) && parseFloat(sum) <= balance && parseFloat(sum) !== 0
    );
  };

  const validateEmail = (value) => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSend = async () => {
    // Перевірка емейла
    const isSumValid = validateSum(sum);
    setIsValidSum(isSumValid);

    // Перевірка емейла
    const isEmailValid = validateEmail(email);
    setIsValidEmail(isEmailValid);

    console.log("isSumValid:", isSumValid);
    console.log("isEmailValid:", isEmailValid);

    if (!isSumValid || !isEmailValid) {
      setErrorMessage("Помилка введених даних");
      setSuccessMessage("");
      return;
    }
    try {
      let response;

      if (!userConfirmed) {
        const confirmed = window.confirm(
          "Are you sure you want to send money?"
        );
        if (!confirmed) {
          return;
        }
        setUserConfirmed(true);
      }

      if (!email || !sum) {
        //alert("Please enter both email and sum.");
        setErrorMessage("Please enter both email and sum.");
        setSuccessMessage("");
        return;
      }

      if (userConfirmed) {
        response = await fetch("http://localhost:4000/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        if (!response.ok) {
          console.error(`Ошибка HTTP: ${response.status}`);
          setErrorMessage("An error occurred while processing the request.");
          setSuccessMessage("");
          return;
        }

        const data = await response.json();

        navigate("/balance");
        senderTransaction = {
          type: "debit",
          amount: parseFloat(sum),
          recipientEmail: email,
          timestamp: new Date(),
        };

        senderNotification = {
          type: "debit",
          message: `You sent ${sum} to ${email}`,
          timestamp: new Date(),
        };

        recipientTransaction = {
          type: "credit",
          amount: parseFloat(sum),
          senderEmail: email,
          timestamp: new Date(),
        };

        recipientNotification = {
          type: "credit",
          message: `You received ${sum} from ${email}`,
          timestamp: new Date(),
        };

        console.log("Sender Transaction:", senderTransaction);
        console.log("Sender Notification:", senderNotification);
        console.log("Recipient Transaction:", recipientTransaction);
        console.log("Recipient Notification:", recipientNotification);

        setEmail("");
        setSum("");
      }
    } catch (error) {
      console.error("Error during JSON processing:", error);

      if (
        error instanceof TypeError &&
        error.message.includes(
          "Cannot read properties of undefined (reading 'json')"
        )
      ) {
        console.error("Network error or invalid response.");
      } else {
        setErrorMessage("An error occurred while processing the request.");
        setSuccessMessage("");
      }
    }
  };

  return (
    <Page>
      <Status />
      <Back />
      <div className="content-send">
        <div className="sending">
          <h1 className="title-up">Send</h1>
        </div>

        <div className="action-send">
          <div className="input">
            <span>Email</span>
            <input
              className="input-recovery-email"
              placeholder="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error-message">{errorMessage}</div>
            <div className="success-message">{successMessage}</div>
          </div>

          <div className="sum">
            <span>Sum</span>
            <input
              className="input-send-sum"
              placeholder="sum"
              label="sum"
              type="number"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
          </div>

          <div className="buttons-rec">
            <button className="button-recovery" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="indicator-send">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default SendPage;
