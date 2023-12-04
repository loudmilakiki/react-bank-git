import "./index.css";
import { Link } from "react-router-dom";

export default function Component({ title = "", description = "" }) {
  return (
    <>
      <div className="content">
        <div className="photo">
          <div className="status-bar"></div>
          <div className="wellcome">
            <h1 className="wellcome-title">{title}</h1>
            <p className="wellcome-description">{description}</p>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="button-up">
          <Link to="./signup">Sing up</Link>
        </button>
        <button className="button-in">Sing in</button>
      </div>

      <div className="indicator">
        <img src="/img/indicator.png" />
      </div>
    </>
  );
}
