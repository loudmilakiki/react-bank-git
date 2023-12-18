import "./index.css";

const Input = () => {
  return (
    <div class="field">
      <label for="{{name}}" class="field__label"></label>
      <input
        oninput="{{action}}(this.name, this.value)"
        type="{{type}}"
        class="field__input validation"
        name="{{name}}"
        placeholder="{{placeholder}}"
      />
    </div>
  );
};

export default Input;
