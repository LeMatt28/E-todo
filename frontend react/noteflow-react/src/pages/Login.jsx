import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulaire soumis (simulation)');
  };

  return (
    <main>
      <form id="loginForm" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input type="email" id="email" name="email" placeholder="Email" required />
        <input type="password" id="password" name="password" placeholder="Mot de passe" required />
        <div>
          <input type="checkbox" id="remember" checked={remember} onChange={() => setRemember(!remember)} />
          <label htmlFor="remember">Se souvenir de moi</label>
        </div>
        <button type="submit">Se connecter</button>
        <Link to="/reset" className="forgot">Mot de passe oublié ?</Link>
      </form>
    </main>
  );
}
