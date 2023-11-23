import React, { useState } from "react";
import { api, login } from "../../services/api";
import "./styles.scss";
import { useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = async (event) => {
    event.preventDefault();
    const { token } = await login(email, password);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    history.push("/");
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
