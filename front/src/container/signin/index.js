import "./index.css";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { Link } from "react-router-dom";

const SigninPage = () => {
  return (
    <Page>
      <Status />
      <Back />

      <div className="content-in">
        <div className="section">
          <h1 className="title-up">Sign in</h1>
          <p className="descr">Sign in Select login method</p>
        </div>

        <div className="action">
          <div className="input">
            <span>Email</span>
            <input
              className="input-signin-email"
              placeholder="email"
              label="Email"
              type="email"
            />
          </div>

          <div className="pass">
            <span className="password">Password</span>
            <input
              className="input-signin-password"
              placeholder="password"
              label="Password"
              type="password"
            />
          </div>
          <span className="simple">Sorry, the password is too simple</span>

          <span>
            Forgot your password?{" "}
            <Link className="click-in" to="../signin/recovery">
              Restore
            </Link>
          </span>

          <div className="buttons-in">
            <button className="button-signin">
              <Link className="click-rec" to="../signin/balance">
                Continue
              </Link>
            </button>
          </div>
        </div>
      </div>

      <div className="indicator-in">
        <img src="/img/indicator.png" />
      </div>
    </Page>
  );
};

export default SigninPage;
