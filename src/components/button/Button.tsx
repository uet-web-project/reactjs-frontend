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
    <div className="button-container">
      <button
        onClick={onClick}
        style={style}
        className="button-style"
        type="button"
      >
        {content}
      </button>
    </div>
  );
}

export default Button;
