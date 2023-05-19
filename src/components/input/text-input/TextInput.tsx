import React from "react";
import CSS from "csstype";
import "./styles.css";
function TextInput({
  fieldName,
  style,
  type,
  value,
  onChange,
  error,
}: {
  fieldName: string;
  style?: CSS.Properties;
  type: string;
  value: string;
  onChange: (event: any) => void;
  error?: string;
}) {
  return (
    <div style={style} className="input-container">
      <div className="field-name-container">
        <span className="fieldName">{fieldName}</span>
        <span className="error-name primary-font">{error}</span>
      </div>
      <input
        value={value}
        onChange={onChange}
        style={{ width: "100%" }}
        className="inputPlace"
        type={type}
      />
    </div>
  );
}

export default TextInput;
