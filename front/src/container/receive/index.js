import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import Box from "../../component/box";
import { useNavigate } from "react-router-dom";

const ReceivePage = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    setAmount(e.currentTarget.value);
  };

  // const handlePaymentMethodChange = (method) => {
  //   setPaymentMethod(method);
  // };

  const handlePaymentClick = (value, e) => {
    setPaymentMethod(value);
    handleReceive();
    navigate("/balance");
  };

  const handleReceive = async () => {
    try {
      // Отправка запроса на сервер с информацией о пополнении баланса
      const response = await fetch("http://localhost:4000/api/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          paymentMethod,
        }),
      });

      if (response.ok) {
        // Ваш код для обработки успешного ответа
        console.log("Receive success!");
      } else {
        // Ваш код для обработки ошибки
        console.error("Receive error:", response.status);
        window.location.href = "/balance";
      }
    } catch (error) {
      // Ваш код для обработки ошибок при запросе
      console.error("Error during JSON processing:", error);
    }
  };

  // const handleReceive = async () => {
  //   try {
  //     // Отправка запроса на сервер с информацией о пополнении баланса
  //     const response = await fetch("http://localhost:4000/api/receive", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         amount,
  //         paymentMethod,
  //       }),
  //     });

  //     if (response.ok) {
  //       // Ваш код для обработки успешного ответа
  //       console.log("Receive success!");
  //     } else {
  //       // Ваш код для обработки ошибки
  //       console.error("Receive error:", response.status);
  //     }
  //   } catch (error) {
  //     // Ваш код для обработки ошибок при запросе
  //     console.error("Error during JSON processing:", error);
  //   }
  // };

  return (
    <Page>
      <Status />
      <Back />
      <h1 className="receive__title">Receive</h1>
      <div className="receive__content">
        <h2 className="receive__subtitle">Receive amount</h2>
        <input
          className="receive-amount"
          placeholder="Amount"
          label="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      <div className="payment__content">
        <h2 className="payment__subtitle">Payment System</h2>

        <Box onClick={handlePaymentClick}>
          <div className="payment-form" data-value="Stripe">
            <div className="payment-pic">
              <img src="/img/Frame 17.png" alt="Icon" />
            </div>
            <div className="payment-info">Stripe</div>
            <div className="payment-logo">
              <img src="/img/frame 539.png" alt="Icon" />
            </div>
          </div>
        </Box>

        <Box onClick={handlePaymentClick}>
          <div className="payment-form" data-value="Coinbase">
            <div className="payment-pic">
              <img src="/img/Frame 19.png" alt="Icon" />
            </div>
            <div className="payment-info">Coinbase</div>
            <div className="payment-logo">
              <img src="/img/frame 537.png" alt="Icon" />
            </div>
          </div>
        </Box>
      </div>

      <div className="indicator-receive">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default ReceivePage;
