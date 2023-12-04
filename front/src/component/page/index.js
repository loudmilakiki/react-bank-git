import "./index.css";

export default function Component({ children, className = "" }) {
  return <div className={`page ${className}`}>{children}</div>;
}
