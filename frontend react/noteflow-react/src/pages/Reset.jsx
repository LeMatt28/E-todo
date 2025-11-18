import React, { useState } from 'react';

export default function Reset() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulaire soumis (simulation)');
  };

  return (
    <main>
      <form id="resetForm" onSubmit={handleSubmit}>
        <h2>Mot de passe oublié</h2>
        <input type="email" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Réinitialiser</button>
      </form>
    </main>
  );
}
