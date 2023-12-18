import Page from "../../component/page";
import "./index.css";
import Status from "../../component/status";
import Back from "../../component/back-button";

const SignupConfirmPage = () => {
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
              label="Code"
              type="code"
            />
          </div>

          <div className="buttons-con">
            <button className="button-confirm">Confirm</button>
          </div>
        </div>
      </div>

      <div className="indicator-con">
        <img src="/img/indicator.png" />
      </div>
    </Page>
  );
};

export default SignupConfirmPage;
