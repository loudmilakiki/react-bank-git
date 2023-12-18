export const REG_EXP_EMAIL = new RegExp(/ ^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);

export const REG_EXP_PASSWORD = new RegExp(
  /^ (?=.*\d)(?=.*[a-z])(?=.* [A-Z])(?=.*[a-zA-Z]).{8,}$/
);

// const REG_EXP_CASH = new RegExp(/^[^-]*$/);

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
  static value = {};
  static error = {};

  static validate = (name, value) => {
    return true;
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
