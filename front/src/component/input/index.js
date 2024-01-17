import "./index.css";

export default function Component({
  name = "",
  label = "",
  type = "text",
  placeholder = "",
  isValid,
  errorMessage,
}) {
  return (
    <div className="field">
      <label form="{{name}}" className="field__label">
        {label}
      </label>
      <input
        action="signupForm.change"
        onChange={(e) => console.log(e.target.value)}
        type={type}
        className="field__input"
        name={name}
        placeholder={placeholder}
      />
      <div className="form__error" style={{ color: "#F23152" }}>
        {isValid ? "" : errorMessage}
      </div>
    </div>
  );
}
