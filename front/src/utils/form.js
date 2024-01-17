export const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);

export const REG_EXP_PASSWORD = new RegExp(
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
);

//const REG_EXP_CASH = new RegExp(/^[^-]*$/);

class InputPassword {
  static toggle = (target) => {
    target.toggleAttribute("show");

    const input = target.previousElementSibling;

    const type = input.getAttribute("type");

    if (type === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  };
}

window.inputPassword = InputPassword;

class SignupForm {
  static FIELD_NAME = {
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirmPassword",
  };

  FIELD_ERROR = {
    IS_EMPTY: "Введіть значення в поле",
    IS_BIG: "Дуже довге значення приберіть зайве",
    EMAIL: "Введіть коректне значення email адреси",
    PASSWORD:
      "Пароль має складатися не менше ніж з 8 символів, включаючи хоча б одну цифру, малу чи велику літеру",
    PASSWORD_AGAIN: "Ваш другий пароль не збігається з першим",
  };

  static value = {};
  static error = {};

  static validate = (name, value) => {
    if (String(value).length < 8) {
      return this.FIELD_ERROR.IS_EMPTY;
    }
    if (name === this.FIELD_NAME.PASSWORD && String(value).length < 8) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD;
      }
    }

    if (name === this.FIELD_NAME.CONFIRM_PASSWORD) {
      if (String(value) !== this.value[this.FIELD_NAME.PASSWORD]) {
        return this.FIELD_ERROR.PASSWORD_AGAIN;
      }
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL;
      }
    }
  };

  static submit = () => {
    console.log(this.value);
  };

  static change = (name, value) => {
    console.log(name, value);
    if (this.validate(name, value)) this.value[name] = value;
  };
}

window.signupForm = SignupForm;
