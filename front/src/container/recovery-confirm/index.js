import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { useLocation, useNavigate } from "react-router-dom";
import InputPassword from "../../component/input-password";

const RecoveryConfirmPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const confirmationCode = queryParams.get("code");
  const email = queryParams.get("email");

  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Отправить запрос на сервер для обновления пароля с использованием code и newPassword
    try {
      const response = await fetch("http://localhost:4000/api/balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        // Успешно обновили пароль, переходим на страницу /balance
        navigate("/balance");
      } else {
        // Обработка ошибок при обновлении пароля
        const result = await response.json();
        setError(result.error);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <Page>
      <Status />
      <Back />

      <div className="content-recon">
        <div className="recovery-confirm">
          <h1 className="title-up">Recover password</h1>
          <p className="descr">Write the code you received</p>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="action-recon">
            <div className="input">
              <span>Code</span>
              <input
                className="input-recovery-confirm-code"
                placeholder="code"
                label="Code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="pass">
              <span>New Password</span>
              <InputPassword
                className="input-recovery-confirm-password"
                placeholder="new password"
                label="Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="buttons-recon">
              <button className="button-recovery-confirm" type="submit">
                Restore Password
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="form__error" style={{ color: "#F23152" }}>
            {error}
          </div>
        )}
      </div>

      <div className="indicator-recon">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default RecoveryConfirmPage;
