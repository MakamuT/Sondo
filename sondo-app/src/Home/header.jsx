import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to light mode
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Apply the theme to the body on load
    document.body.classList.toggle("dark", theme);
  }, [theme]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    document.body.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="circle"></div>
        <span>Sondo</span>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/booking" onClick={closeMenu}>
          About us
        </Link>
        <Link to="/home" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
        <Link to="/login" onClick={closeMenu}>
          Log out
        </Link>
        <button
          className="dark-btn"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {theme ? <FaSun /> : <FaMoon />}

        </button>
      </nav>
    </header>
  );
};

export default Header;
