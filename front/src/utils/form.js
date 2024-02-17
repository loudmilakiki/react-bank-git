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

// if (!value) {
//   return this.FIELD_ERROR.IS_EMPTY;
// }
// if (name === this.FIELD_NAME.PASSWORD && String(value).length < 8) {
//   return this.FIELD_ERROR.PASSWORD;
// }

// if (
//   name === this.FIELD_NAME.PASSWORD &&
//   !REG_EXP_PASSWORD.test(String(value))
// ) {
//   return this.FIELD_ERROR.PASSWORD;
// }

// if (name === this.FIELD_NAME.CONFIRM_PASSWORD) {
//   if (String(value) !== this.value[this.FIELD_NAME.PASSWORD]) {
//     return this.FIELD_ERROR.PASSWORD_AGAIN;
//   }
// }

// if (name === this.FIELD_NAME.EMAIL) {
//   if (!REG_EXP_EMAIL.test(String(value))) {
//     return this.FIELD_ERROR.EMAIL;
//   }
// }

// Используем свойство экземпляра
// console.log(name, value);
// if (this.validate(name, value)) this.value[name] = value;

//   static change = (name, value) {
//     if (!this.value) {
//       this.initialize();
//     }

//     console.log(name, value);
//     if (SignupForm.validate(name, value)) {
//       this.value[name] = value;
//       console.log(this.value);
//     }
//   }
// }

// SignupForm.initialize();

// Simulate changes to the form values

// SignupForm.change("email", "example@example.com");
// SignupForm.change("password", "Password123");
// SignupForm.change("confirmPassword", "Password123");

// Call the submit method with the instance
// SignupForm.submit();

export class Form {
  FIELD_NAME = {};
  FIELD_ERROR = {};

  value = {};
  error = {};

  change = (name, value) => {
    const error = this.validate(name, value);

    this.value[name] = value;

    if (error) {
      this.setError(name, error);
      this.error[name] = error;
    } else {
      this.setError(name, null);
      delete this.error[name];
    }
  };

  setError = (name, error) => {};
}
