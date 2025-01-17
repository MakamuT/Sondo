/* LandingPage.js */
import React from "react";
import "./LandingPage.css";
import Header from "../Home/Header";
function LandingPage() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <div className="image-container">
          <img className="hero-image"
            src="https://images.unsplash.com/photo-1585244129648-5dc1f9cd9d7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A person using a mobility scooter in a mall"
          />
        </div>
        <div className="text-content">
          <h1>Plan Ahead for a Stress-Free Mall Visit!</h1>
          <p>
            Easily reserve a wheelchair in advance and enjoy your mall experience
            with peace of mind.
          </p>
          <div className="button-group">
            <button className="cta-button book">Book a Wheelchair</button>
            <button className="cta-button find">Learn more</button>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
