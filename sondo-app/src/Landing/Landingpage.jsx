import React from "react";
import "./LandingPage.css";
import Header from "../Home/Header";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <div className="image-container">
          <img
            className="hero-image"
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
            <Link to="/booking">
              <button className="cta-button book">Book a Wheelchair</button>
            </Link>
            <button className="cta-button find">Learn more</button>
          </div>
        </div>
      </main>
      <section className="feature-section">
  <div className="feature-container">
    <div className="feature-item card">
      <h3>Easy Booking</h3>
      <p>
        Reserve a wheelchair in advance with just a few clicks. Plan ahead and make sure your mobility aid is ready when you arrive at the mall.
      </p>
    </div>
    <div className="feature-item card">
      <h3>Multiple Mall Options</h3>
      <p>
        Choose from a variety of malls in your area. Sondo ensures that you can book a wheelchair at any participating mall with ease.
      </p>
    </div>
    <div className="feature-item card">
      <h3>Seamless Experience</h3>
      <p>
        Enjoy a hassle-free experience when you visit the mall. Your reservation is confirmed, and your wheelchair is waiting for you at the entrance.
      </p>
    </div>
  </div>
</section>

      <section className="about-section">
        <div className="about-content">
          <h2>About Sondo</h2>
          <div>
            <div>
                        <p>
            Sondo is a platform dedicated to improving accessibility and
            convenience for people with mobility challenges.
            </p>
          <p>
            By offering a simple, user-friendly interface, we ensure that our
            users can easily book a wheelchair at the mall of their choice,
            ensuring it’s ready for them when they arrive. Whether you’re
            visiting a mall for leisure, work, or anything in between, Sondo
            provides a seamless solution to ensure your comfort and peace of
            mind. At Sondo, we are committed to promoting inclusivity and making
            everyday experiences more accessible to everyone. Join us in creating
            a world where everyone can move freely and confidently, no matter
            their mobility needs.
          </p>
          <p>Let us move you!</p>
            </div>

          </div>
        </div>
      </section>

      <footer className="footer">
        <p>
          &copy; 2024 Sondo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;