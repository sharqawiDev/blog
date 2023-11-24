import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { register } from "../../services/api";
import "./styles.scss";
import { LOGIN_ROUTE } from "../../services/routes";
function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const data = {
        firstName,
        lastName,
        email,
        password,
      };
      await register(data);
      history.push(LOGIN_ROUTE);
    } catch (error) {
      console.log(error);
    }
  };
  const isFormValid = () => {
    return (
      firstName !== "" && lastName !== "" && email !== "" && password !== ""
    );
  };
  return (
    <div className="register-card">
      <h1 className="register-card__header">Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </div>
  );
}

export { Register };
