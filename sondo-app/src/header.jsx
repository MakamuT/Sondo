import React, { useState } from "react";
import './home.css'
const Header = () => {

  return (
    <header className="header">
        <div className="logo">
          <div className="circle"></div>
          <span>Sondo</span>
        </div>
        <nav>
          <a href="#">Booking</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </nav>
      </header>
  )
}
export default Header;
