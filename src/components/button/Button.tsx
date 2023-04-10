import React from "react";
import CSS from "csstype";
import "./styles.css";
function Button({
  onClick,
  style,
  content,
}: {
  onClick: () => void;
  style?: CSS.Properties;
  content: string;
}) {
  return (
    <button
      onClick={onClick}
      className="button-style"
      type="button"
      style={style}
    >
      {content}
    </button>
  );
}

export default Button;
