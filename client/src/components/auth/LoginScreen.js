import React, { useState } from "react";

function LoginScreen({ onLogin, onSwitchToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Uniemożliwia ponowne wysłanie formularza
    setIsSubmitting(true);
    try {
      await onLogin(username, password);
    } catch (error) {
      alert("Wrong Login or Password");
      
    } finally {
      setIsSubmitting(false); // Przywrócenie możliwości klikania po zakończeniu
    }
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging..." : "Login"}
        </button>
        <button type="button" onClick={onSwitchToLogin}>
          Go and register your self now !
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
