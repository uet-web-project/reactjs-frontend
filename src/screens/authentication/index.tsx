import React, { useState } from "react";
import "./styles.css";

function Login() {
  const [userName, userNameChange] = useState("");
  const [passWord, passWordChange] = useState("");
  function updateUserName(e: any) {
    userNameChange(e.target.value);
  }
  function updatePassWord(e: any) {
    passWordChange(e.target.value);
  }
  return (
    <div className="login">
      <label className="login"> Username: </label>
      <input
        className="login"
        value={userName}
        type="text"
        onChange={updateUserName}
      />
      <label className="password"> PassWord: </label>
      <input
        className="password"
        type="password"
        value={passWord}
        onChange={updatePassWord}
      />
    </div>
  );
}

export default Login;
