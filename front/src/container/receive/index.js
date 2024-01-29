import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import Box from "../../component/box";
import { useNavigate } from "react-router-dom";
import Input from "../../component/input";

const ReceivePage = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateAmount = (amount) => {
    const regex =
      /^(?!$|\s)(?:(?!^0\.00$)^\d{1,6}(?:\.\d{1,2})?$|^(?!^0$)\d{1,6}$)/;

    return regex.test(amount);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.currentTarget.value;
    const isAmountValid = validateAmount(newAmount);

    //setIsValidAmount(isAmountValid);

    if (!isAmountValid) {
      setErrorMessage("Помилка введених даних");
      setSuccessMessage("");
    }

    setAmount(newAmount);
    setAmount(e.currentTarget.value);
  };

  const handlePaymentClick = (value, e) => {
    setPaymentMethod(value);
    handleReceive();
    navigate(`/balance/receive?amount=${amount}&paymentMethod=${value}`);
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
        const responseData = await response.json();

        const newTransaction = {
          id: responseData.transactionId,
          amount: responseData.amount,
          paymentMethod: responseData.paymentMethod,
        };

        setTransactions((prevTransactions) => [
          newTransaction,
          ...prevTransactions,
        ]);

        localStorage.setItem("newTransaction", JSON.stringify(newTransaction));
        navigate(`/balance?amount=${amount}&paymentMethod=${paymentMethod}`);
        console.log("Receive success!");
      } else {
        console.error("Receive error:", response.status);
      }
    } catch (error) {
      console.error("Error during JSON processing:", error);
    }
  };

  return (
    <Page>
      <Status />
      <Back />
      <h1 className="receive__title">Receive</h1>
      <div className="receive__content">
        <h2 className="receive__subtitle">Receive amount</h2>
        <div className="input-icon">
          <span className="icon">$</span>
          <input
            className="receive-amount"
            placeholder=""
            //label="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            isValid={isValidAmount}
          />
        </div>
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
