import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.style.fontFamily = "'Inter', sans-serif";
    } else {
      document.body.classList.remove("dark");
      document.body.style.fontFamily =
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={(e) => setDarkMode(e.target.checked)}
      />
      <label className="slider"></label>
    </div>
  );
}