import "./index.css";

export default function Box({ children, type, onClick, value }) {
  const handleClick = (e) => {
    onClick(value, e);
  };

  return (
    <div onClick={handleClick} className="box">
      {children}
    </div>
  );
}
