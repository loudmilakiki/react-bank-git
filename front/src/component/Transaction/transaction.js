import React from "react";

const Transaction = ({ type, amount, recipient, paymentMethod }) => {
  return (
    <div className="transaction">
      <div className="info">
        <div className="user">{recipient}</div>
        <div className="detail">
          <h2>{amount}</h2>
          <div>{type === "payment" ? "Payment" : "Transfer"}</div>
          {type === "payment" && <div>Payment Method: {paymentMethod}</div>}
        </div>
      </div>

      <div className="count-recep">
        {type === "payment" ? "-" : "+"}
        {amount}
      </div>
    </div>
  );
};

export default Transaction;
