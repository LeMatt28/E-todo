import ThemeSwitch from "./Themes.jsx";

export default function Header() {
  return (
    <header>
      <h1><a href="#" className="logo">NoteFlow</a></h1>
      <button className="menu-toggle">☰</button>
      <nav id="navLinks">
        {/* les liens sont gérés via App.jsx */}
        <ThemeSwitch />
      </nav>
    </header>
  );
}