import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    email: '', lastName: '', firstName: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    alert('Formulaire soumis (simulation)');
  };

  return (
    <main>
      <form id="registerForm" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Nom" value={form.lastName} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="Prénom" value={form.firstName} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirmer mot de passe" value={form.confirmPassword} onChange={handleChange} required />
        <button type="submit">Créer mon compte</button>
      </form>
    </main>
  );
}
