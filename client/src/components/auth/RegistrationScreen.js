import React, { useState } from "react";

function RegistrationScreen({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onRegister(username, password);
    } else {
      alert("Full all fields.");
    }
  };

  return (
    <div className="register-screen">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>REGISTRATION</h1>
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

        <button type="submit">Submit registration</button>
        <button type="button" onClick={onSwitchToLogin}>
          Go back to Login
        </button>
      </form>
    </div>
  );
}

export default RegistrationScreen;
