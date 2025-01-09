import { useState } from "react";
import { Link } from "react-router-dom";

import './home.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
        <a href="#">Contact</a>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
