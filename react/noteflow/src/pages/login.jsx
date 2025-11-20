import { useState } from "react";

export default function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      alert(data.message || "Connexion réussie !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <main>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        <button type="button" onClick={() => onSwitch("register")}>
          Créer un compte
        </button>
        <button type="button" onClick={() => onSwitch("reset")}>
          Mot de passe oublié ?
        </button>
      </form>
    </main>
  );
}