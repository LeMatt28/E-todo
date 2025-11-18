import { useState } from "react";

export default function Reset({ onSwitch }) {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Veuillez entrer votre email.");
      return;
    }
    alert(`Email de réinitialisation envoyé à ${email} (simulation).`);
  };

  return (
    <main>
      <form className="login-form" onSubmit={handleReset}>
        <h2>Mot de passe oublié</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Réinitialiser</button>
        <button type="button" onClick={() => onSwitch("login")}>
          Retour à la connexion
        </button>
      </form>
    </main>
  );
}