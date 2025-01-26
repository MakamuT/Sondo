import React from "react";
import "./Terms.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const Terms = () => {
  return (
    <div className="terms-page">
      <Header />
      <div className="terms-container">
        <h1 className="terms-title">Terms of Service</h1>

        <p className="terms-intro">
          Welcome to Sondo! By using our website and services, you agree to the
          following terms and conditions. Please read them carefully.
        </p>

        <div className="terms-section">
          <h2 className="section-title">1. Acceptance of Terms</h2>
          <p className="section-content">
            By accessing or using Sondo, you agree to be bound by these Terms of
            Service and our Privacy Policy. If you do not agree with any part of
            these terms, you must discontinue using our services immediately.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">2. User Responsibilities</h2>
          <p className="section-content">
            You are responsible for providing accurate information when creating
            bookings. Misuse of the platform, such as providing false
            information or fraudulent activity, is strictly prohibited.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">3. Booking Process</h2>
          <p className="section-content">
            All bookings are subject to availability. We reserve the right to
            cancel any booking due to unforeseen circumstances. Users will be
            notified promptly if such cancellations occur.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">4. Limitation of Liability</h2>
          <p className="section-content">
            Sondo is not liable for any damages arising from the use of mobility
            aids or any issues encountered at partnered malls. Users are
            encouraged to verify the condition of the equipment before use.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">5. Changes to Terms</h2>
          <p className="section-content">
            We reserve the right to modify these Terms of Service at any time.
            Users will be notified of significant changes via email or a notice
            on our website.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="section-title">6. Contact Us</h2>
          <p className="section-content">
            If you have any questions or concerns about these terms, please
            contact us at <a href="mailto:support@sondo.com">support@sondo.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
