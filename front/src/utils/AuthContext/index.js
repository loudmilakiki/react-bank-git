import { createContext, useContext, useReducer } from "react";
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from "../../utils/form.js";
import { useState } from "react";
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const SignupForm = () => {
  const FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
    PASSWORD_AGAIN: "passwordAgain",
    CONFIRM_PASSWORD: "confirmPassword",
  };

  const FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення приберіть зайве",
    EMAIL: "Введіть коректне значення email адреси",
    PASSWORD:
      "Пароль має складатися не менше ніж з 8 символів, включаючи хоча б одну цифру, малу чи велику літеру",
    PASSWORD_AGAIN: "Ваш другий пароль не збігається з першим",
    NOT_CONFIRM: "Ви не погоджуєтесь з правилами",
  };

  const [formData, setFormData] = useState({});
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);

  const validate = (name, value) => {
    if (String(value).length < 1) {
      return FIELD_ERROR.IS_EMPTY;
    }

    if (String(value).length > 20) {
      return FIELD_ERROR.IS_BIG;
    }

    if (name === FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return FIELD_ERROR.EMAIL;
      }
    }

    if (name === FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return FIELD_ERROR.PASSWORD;
      }
    }

    if (name === FIELD_NAME.PASSWORD_AGAIN) {
      if (String(value) !== value[FIELD_NAME.PASSWORD]) {
        return FIELD_ERROR.PASSWORD_AGAIN;
      }
    }

    if (name === FIELD_NAME.IS_CONFIRM) {
      if (Boolean(value) !== true) {
        return FIELD_ERROR.NOT_CONFIRM;
      }
    }
  };

  const submit = () => {
    console.log(formData);
  };

  const change = (name, newValue) => {
    console.log(name, newValue);
    if (validate(name, newValue)) {
      setValue({ ...value, [name]: newValue });
    }
  };

  const initialize = () => {
    setFormData = {};
    setError = {};
  };

  return { submit, change, initialize, value, error, disabled };
};

export { SignupForm };

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    users: [],
    token: null,
    user: {},
  });

  const login = (token, user) => {
    authDispatch({ type: "LOGIN", payload: { token, user } });
  };

  const logout = () => {
    authDispatch({ type: "LOGOUT" });
  };

  const authContextData = {
    state: authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
