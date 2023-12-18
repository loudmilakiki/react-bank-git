import "./index.css";
import React, { useState } from "react";

const InputPassword = () => {
  return (
    <div class=" field--password">
      <label for="{{name}}" class="field__label"></label>

      <div class="field__wrapper">
        <input
          oninput="{{action}}(this.name, this.value)"
          type="password"
          className="field__input validation"
          name="{{name}}"
          value=""
          placeholder="Password"
        />
        <span onclick="inputPassword.toggle(this)" class="field__icon"></span>
      </div>
    </div>
  );
};

export default InputPassword;
