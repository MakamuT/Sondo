import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const [theme, setTheme] = useState(false);
  useEffect(() => { 
    if (theme) {
      document.body.classList.add();
    }
  });

  return (
    <header className="header">
      <div className="logo">
        <div className="circle"></div>
        <span>Sondo</span>
      </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <Link to="/booking">Booking</Link>
        <Link to="/home">Home</Link>
        <Link to="/">Contact</Link>
        <Link to="/login">Login</Link>
        <button>Dark</button>
      </nav>
    </header>
  );
};

export default Header;
