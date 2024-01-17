import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import "./index.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TransactionPage = () => {
  const { transactionId } = useParams();

  return (
    <Page>
      <Status />
      <Back />

      <div className="section">
        <h1 className="title-up">Transaction </h1>
      </div>
      <div className="transaction-form">
        <div className="transaction-amount">-$30.00</div>

        <div className="transaction-content">
          <div className="transaction-block">
            <div className="transaction-box">
              <div>Date</div>
              <div>25 May, 15.20</div>
            </div>

            <div className="transaction-box">
              <div>Address</div>
              <div>user123@gmail.com</div>
            </div>

            <div className="transaction-box">
              <div>Type</div>
              <div>Receive</div>
            </div>
          </div>
        </div>
      </div>

      <div className="indicator-transaction">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default TransactionPage;
