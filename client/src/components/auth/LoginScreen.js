import React, { useState } from "react";

function LoginScreen({ onLogin, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-screen">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>LOGIN</h1>

        <label>Login:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <button type="button" onClick={onSwitchToLogin}>
          Go and register your self now !
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
