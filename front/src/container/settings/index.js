import "./index.css";
import React, { useState } from "react";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { useEffect } from "react";
import Input from "../../component/input";
import InputPassword from "../../component/input-password";

const SettingsPage = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const { authState, authDispatch } = useAuth();
  const { user, token } = authState;
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  const validateEmail = (formData) => {
    // Перевірка емейла
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData);
  };

  const validatePassword = (formData) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // return passwordRegex.test(formData);
    const isValid = passwordRegex.test(formData.password);
    setIsPasswordValid(isValid);
  };

  const validateForm = () => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData);
    const isPasswordConfirmationValid =
      formData.password === formData.confirmPassword;

    return {
      isEmailValid,
      isPasswordValid,
      isPasswordConfirmationValid,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form...");

    const { isEmailValid, isPasswordValid, isPasswordConfirmationValid } =
      validateForm();

    console.log("Before confirmation code generation");
    const confirmationCode = Math.floor(1000 + Math.random() * 9000);
    const userConfirmed = window.confirm(
      `Your confirmation code is: ${confirmationCode}. Proceed?`
    );
    console.log("After confirmation code generation");

    if (userConfirmed) {
      try {
        const response = await fetch("http://localhost:4000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            confirmationCode: confirmationCode,
          }),
        });
      } catch (error) {
        console.error("Error during fetch:", error);
        setErrorMessage("Error processing server response");
      }
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleSaveEmail = () => {
    const newEmail = email;

    // Предполагаем, что user - это объект с информацией о пользователе
    const updatedUser = { ...user, email: newEmail };

    authDispatch({
      type: "LOGIN",
      payload: { user: updatedUser, token: token },
    });
    // Здесь вызывайте функцию для изменения почты и обновления контекста аутентификации
    console.log("Saving email:", email);
  };

  useEffect(() => {
    console.log("Saving email:", email); // Выводите значение email в useEffect
  }, [email]); // Вызывать useEffect при изменении email
  return (
    <Page>
      <Status />
      <Back />
      <h1 className="settings__title">Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="settings">
          <h2 className="settings-change">Change email</h2>

          <div className="settings-content">
            <Input
              className="settings-email"
              placeholder="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              isValid={isValidEmail}
            />
          </div>

          <div className="settings-content">
            <h2>Old Password</h2>
            <InputPassword
              className="settings-oldpassword"
              placeholder="Old Password"
              label="Old Password"
              type="oldpassword"
              value={oldPassword}
              onChange={handleOldPasswordChange}
            />
          </div>

          <button className="save-email" onClick={handleSaveEmail}>
            Save Email
          </button>
        </div>

        <div className="settings">
          <h2 className="settings-pass">Change Password</h2>
          <div className="settings-content">
            <h2>Old Password</h2>
            <InputPassword
              className="settings-password"
              placeholder="Old Password"
              label="oldpassword"
              type="oldpassword"
            />
          </div>

          <div className="settings-content">
            <h2>New Password</h2>
            <InputPassword
              className="settings-oldpassword"
              placeholder="New Password"
              label="Old Password"
              type="oldpassword"
            />
          </div>

          <button className="button-save">
            <Link className="save-email">Save Password</Link>
          </button>
        </div>
      </form>

      <div className="button-logout">
        <button>
          <Link className="break" to="/wellcome">
            Log Out
          </Link>
        </button>
      </div>

      <div className="indicator-setting">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default SettingsPage;
