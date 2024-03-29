import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { api, login } from "../../services/api";
import { REGISTER_ROUTE } from "../../services/routes";
import "./styles.scss";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { token } = await login(email, password);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const isFormValid = () => {
    return email !== "" && password !== "";
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
  }, []);
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
      <Link to={REGISTER_ROUTE} className="register-msg">
        {"Don't have an account? "}
        <span>Register</span>
      </Link>
    </div>
  );
}

export { Login };
