import React, { useState } from "react";

function RegistrationScreen({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Uniemożliwia ponowne wysłanie formularza
    setIsSubmitting(true);
    try {
      await onRegister(username, password);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false); // Przywrócenie możliwości klikania po zakończeniu
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
        <button type="button" onClick={onSwitchToLogin}>
          Go back to Login
        </button>
      </form>
    </div>
  );
}

export default RegistrationScreen;
