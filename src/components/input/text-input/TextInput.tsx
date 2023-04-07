import React from "react";
import CSS from "csstype";
import "./styles.css";
function TextInput({
  fieldName,
  style,
  type,
  value,
  onChange,
}: {
  fieldName: string;
  style?: CSS.Properties;
  type: string;
  value: string;
  onChange: (event: any) => void;
}) {
  return (
    <div className="input-container">
      <p className="fieldName">{fieldName}</p>
      <input
        value={value}
        onChange={onChange}
        style={style}
        className="inputPlace"
        type={type}
      />
    </div>
  );
}

export default TextInput;
