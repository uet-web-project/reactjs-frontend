import React from "react";
import CSS from "csstype";
import "./styles.css";
function Button({
  onClick,
  style,
  content,
  className,
  id,
}: {
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  style?: CSS.Properties;
  content: string;
  className?: string;
  id?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`button-style ${className ? className : ""}`}
      id={id}
      type="button"
      style={style}
    >
      {content}
    </button>
  );
}

export default Button;
