import React from "react";
import CSS from "csstype";
import "./styles.css";
function TextInput({
  fieldName,
  style,
}: {
  fieldName: string;
  style?: CSS.Properties;
}) {
  return (
    <div className="input-container">
      <p className="fieldName">{fieldName}</p>
      <input style={style} className="inputPlace" type="text" />
    </div>
  );
}

export default TextInput;
