import React from "react";
import CSS from "csstype";
import "./styles.css";
function Button({
  style,
  content,
}: {
  style?: CSS.Properties;
  content: string;
}) {
  return (
    <div className="button-container">
      <button style={style} className="button-style" type="button">
        {content}
      </button>
    </div>
  );
}

export default Button;
