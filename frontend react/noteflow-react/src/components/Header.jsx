import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from './ThemeSwitch';

export default function Header({ theme, toggleTheme }) {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header>
      <h1><Link to="/">NoteFlow</Link></h1>
      <button className="menu-toggle" onClick={() => setMenuActive(!menuActive)}>☰</button>
      <nav id="navLinks" className={menuActive ? 'active' : ''}>
        <Link to="/register">Créer un compte</Link>
        <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
      </nav>
    </header>
  );
}
