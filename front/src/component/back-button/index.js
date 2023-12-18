import "./index.css";

export default function Component() {
  const handleClick = () => window.history.back();

  return (
    <div onClick={handleClick} className="back-button">
      <img src="/img/arrow-back.png" />
    </div>
  );
}
