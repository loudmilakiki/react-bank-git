import React, { useEffect, useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import "./index.css";
import { useParams } from "react-router-dom";
//import { Link } from "react-router-dom";

const TransactionPage = () => {
  const { transactionId } = useParams();
  const [transactionData, setTransactionData] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/transaction/${transactionId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              date: "25 May",
              address: "user123@mail.com",
              type: "receive",
            }),
          }
        );

        if (response.ok) {
          const transactionData = await response.json();
          setTransactionData(transactionData);

          setBalance((prevBalance) => prevBalance + transactionData.amount);
        } else {
          console.error("Error fetching transaction data:", response.status);
        }
      } catch (error) {
        console.error("Error during JSON processing:", error);
      }
    };

    fetchTransactionData();
  }, [transactionId]);
  return (
    <Page>
      <Status />
      <Back />

      {/* {transactionData ? (
        <div className="section">
          <h1 className="title-up">Transaction </h1>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}

      {transactionData && (
        <div className="transaction-form">
          <div className="transaction-amount">{`$${transactionData.amount}`}</div>

          <div className="transaction-content">
            <div className="transaction-block">
              <div className="transaction-box">
                <div>Date</div>
                <div>{transactionData.date}</div>
              </div>

              <div className="transaction-box">
                <div>Address</div>
                <div>{transactionData.address}</div>
              </div>

              <div className="transaction-box">
                <div>Type</div>
                <div>{transactionData.type}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="indicator-transaction">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default TransactionPage;
