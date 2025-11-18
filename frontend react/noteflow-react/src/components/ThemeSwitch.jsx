import React from 'react';

export default function ThemeSwitch({ theme, toggleTheme }) {
  return (
    <div className="switch">
      <input
        type="checkbox"
        id="themeSwitch"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <label htmlFor="themeSwitch" className="slider"></label>
    </div>
  );
}
