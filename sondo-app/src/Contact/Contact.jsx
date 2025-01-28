import React from "react";
import "./Contact.css";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-us-container">
        <Header/>
      <div className="contact-us-card">
        <h1 className="contact-title">Contact Us</h1>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <h2 className="info-title">Phone</h2>
              <p className="info-detail">📞 +277 083 678 7856</p>
            </div>
            <div className="contact-item">
              <h2 className="info-title">Email</h2>
              <p className="info-detail">✉️ support@sondo.com</p>
            </div>
            <div className="follow-us">
              <h2 className="info-title">Follow Us</h2>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>



          {/* Contact Form */}
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  className="form-textarea"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
  );
};

export default Contact;
