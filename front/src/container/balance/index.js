import "./index.css";
import React, { useState, useEffect } from "react";
import Page from "../../component/page";
import { Link, useLocation } from "react-router-dom";
//import Transaction from "../../component/Transaction/transaction";

const BalancePage = () => {
  const [transactions, setTransactions] = useState([]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const amount = queryParams.get("amount");
  const paymentMethod = queryParams.get("paymentMethod");

  const fetchTransactions = async () => {
    try {
      if (paymentMethod !== null) {
        const response = await fetch(
          `http://localhost:4000/api/transaction?paymentMethod=${paymentMethod}`
        );

        if (response.ok) {
          const transactionsData = await response.json();
          setTransactions(transactionsData);
        } else {
          console.error("Error fetching transactions:", response.status);
        }
      }
    } catch (error) {
      console.error("Error during JSON processing:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();

    const newTransaction = JSON.parse(localStorage.getItem("newTransaction"));
    if (newTransaction) {
      setTransactions((prevTransactions) => [
        newTransaction,
        ...prevTransactions,
      ]);
      localStorage.removeItem("newTransaction"); // Очистка сохраненной транзакции
    }
  }, []);

  return (
    <Page>
      <div className="content-balance">
        <div className="status-bar"></div>
        <div className="group1">
          <div className="filter">
            <Link to="./settings">
              <img src="/img/filter.png" alt="Icon" />
            </Link>
          </div>

          <p className="descr-balance">Main wallet</p>

          <div className="filter">
            <Link to="./notifications">
              <img src="/img/bell-ringing.png" alt="Icon" />
            </Link>
          </div>
        </div>
        <h1 className="title-balance">$ 100.20</h1>
      </div>

      <div className="receive">
        <Link to="./receive">
          <img src="/img/arrow-down-right.png" alt="Icon" />
        </Link>
      </div>

      <div className="send">
        <Link to="./send">
          <img src="/img/users.png" width="28" height="28" alt="Icon" />
        </Link>
      </div>

      <Link className="send__link" to="/balance/send ">
        Send
      </Link>

      <Link className="receive__link" to="/balance/receive">
        Receive
      </Link>

      <ul className="transactions">
        <li>
          <Link className="transaction-link" to="/balance/transaction">
            {transactions.length > 0 && (
              <div className="transaction">
                <div className="logo">
                  <img src="/img/Frame 17.png" alt="Icon" />
                </div>

                <div className="info">
                  <div className="user">User</div>
                  <div className="detail">
                    <h2>{transactions[0].amount}</h2>
                    <div>Receipt</div>
                  </div>
                </div>

                <div className="count-recep">
                  <span>-{amount}</span>
                </div>
              </div>
            )}

            <div className="transaction">
              <div className="logo">
                <img src="/img/Frame 17.png" alt="Icon" />
              </div>

              <div className="info">
                <div className="user">Jon Duo</div>
                <div className="detail">
                  <h2>12.25</h2>
                  <div>Sending</div>
                </div>
              </div>

              <div className="count-recep">
                <span>-$200.00</span>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link className="transaction-link" to="../balance/transaction">
            <div className="transaction">
              <div className="logo">
                <img src="/img/Frame 18.png" alt="Icon" />
              </div>

              <div className="info">
                <div className="user">Oleg V.</div>
                <div className="detail">
                  <h2>12.25</h2>
                  <div>Receipt</div>
                </div>
              </div>

              <div className="count-send">
                <span>+$125.00</span>
              </div>
            </div>
          </Link>
        </li>
        <li>
          <Link className="transaction-link" to="../balance/transaction">
            <div className="transaction">
              <div className="logo">
                <img src="/img/Frame 19.png" alt="Icon" />
              </div>

              <div className="info">
                <div className="user">Coinbase</div>
                <div className="detail">
                  <h2>10.20</h2>
                  <div>Receipt</div>
                </div>
              </div>

              <div className="count-send">
                <span>+$1.125.00</span>
              </div>
            </div>
          </Link>
        </li>
      </ul>
      <div className="indicator-balance">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default BalancePage;
