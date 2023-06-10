import React from "react";
import CSS from "csstype";
import "./styles.css";
function Button({
  onClick,
  style,
  content,
  className,
}: {
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  style?: CSS.Properties;
  content: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`button-style ${className ? className : ""}`}
      type="button"
      style={style}
    >
      {content}
    </button>
  );
}

export default Button;
