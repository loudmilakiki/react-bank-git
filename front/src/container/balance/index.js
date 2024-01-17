import "./index.css";
import React, { useState, useEffect } from "react";
import Page from "../../component/page";
import { Link } from "react-router-dom";

const BalancePage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
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
          <Link className="transaction-link" to="../balance/transaction">
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
