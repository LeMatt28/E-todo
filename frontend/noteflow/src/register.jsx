// Register.jsx
import { useEffect } from 'react';

export default function Register({ goTo }) {
  useEffect(() => {
    const themeSwitches = document.querySelectorAll('#themeSwitch');
    themeSwitches.forEach(themeSwitch => {
      themeSwitch.addEventListener('change', () => {
        const darkMode = themeSwitch.checked;
        if (darkMode) {
          document.body.classList.add('dark');
          document.body.style.fontFamily = "'Inter', sans-serif";
        } else {
          document.body.classList.remove('dark');
          document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        themeSwitches.forEach(sw => { sw.checked = darkMode; });
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
      });
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      document.body.style.fontFamily = "'Inter', sans-serif";
      themeSwitches.forEach(sw => { sw.checked = true; });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
      const helpPopup = document.querySelector('.help-popup');
      helpBtn.addEventListener('click', () => helpPopup.classList.toggle('show'));
    }

    const logoLink = document.querySelector('header h1 a');
    if (logoLink) logoLink.addEventListener('click', e => { e.preventDefault(); goTo('login'); });
  }, [goTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('formulaire envoyé (simulation)');
  };

  return (
    <>
      <header>
        <h1><a href="#">NoteFlow</a></h1>
        <button className="menu-toggle">☰</button>
        <nav id="navLinks">
          <a href="#" onClick={() => goTo('login')}>Connexion</a>
          <div className="switch">
            <input type="checkbox" id="themeSwitch" />
            <label htmlFor="themeSwitch" className="slider"></label>
          </div>
        </nav>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <h2>Créer un compte</h2>
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Nom" required />
          <input type="text" placeholder="Prénom" required />
          <input type="password" placeholder="Mot de passe" required />
          <input type="password" placeholder="Confirmer mot de passe" required />
          <button type="submit">Créer mon compte</button>
        </form>
      </main>
      <button id="helpBtn">?</button>
      <div className="help-popup">Besoin d'aide ? Contactez support@noteflow.com</div>
    </>
  );
}
