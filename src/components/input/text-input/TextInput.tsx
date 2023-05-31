import React from "react";
import CSS from "csstype";
import "./styles.css";
import CheckIcon from "@mui/icons-material/Check";
function TextInput({
  fieldName,
  style,
  type,
  value,
  onChange,
  error,
  showIcon,
  placeholder,
  className,
}: {
  fieldName?: string;
  style?: CSS.Properties;
  type: string;
  value: string | number ;
  onChange: (event: any) => void;
  error?: string;
  showIcon?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div style={style} className="input-container">
      <div className="field-name-container">
        <span className="fieldName">{fieldName}</span>
        {showIcon == true ? (
          <span>
            <CheckIcon sx={{ color: "green" }} />
          </span>
        ) : null}
        {error?.length ? (
          <span className="error-name primary-font">{error}</span>
        ) : null}
      </div>
      <input
        value={value}
        onChange={onChange}
        style={{ width: "100%" }}
        className={`inputPlace placeholder-gray-500 text-sm ${className ? className : ""}`}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;
