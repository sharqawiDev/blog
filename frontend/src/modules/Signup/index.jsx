import React, { useState } from "react";
import { login } from "../../services/api";
import "./styles.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    login({ email, password });
  };
  const isFormValid = () => {
    return email !== "" && password !== "";
  };
  return (
    <div className="login-card">
      <h1 className="login-card__header">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={!isFormValid()}>
          Enter
        </button>
      </form>
    </div>
  );
}

export { Login };
