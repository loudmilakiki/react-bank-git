import "./index.css";

export default function Component({ title = "", description = "" }) {
  return (
    <>
      <div>
        <div className="status-up"></div>
      </div>
      <div className="img">
        <img src="/img/arrow-back.png" />
      </div>

      <div className="content-up">
        <div className="signup">
          <div className="signup-title">{title}</div>
          <div className="signup-description">{description}</div>
        </div>

        <div className="action">
          <div className="input">
            <span>Email</span>
            <input
              className="input-signup-email"
              placeholder="email"
              label="Email"
              type="email"
            />
          </div>

          <div className="pass">
            <span>Password</span>
            <input
              className="input-signup-password"
              placeholder="password"
              label="Password"
              type="password"
            />
          </div>

          <span>Already have an account? Sign In</span>

          <div className="buttons">
            <button className="button-signup">Continue</button>
          </div>
        </div>
      </div>

      <div className="error">
        <p> A user with the same name is already exist</p>
      </div>

      <div className="indicator-up">
        <img src="/img/indicator.png" />
      </div>
    </>
  );
}
