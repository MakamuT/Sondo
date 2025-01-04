import { useState, useEffect } from "react";
import "./Booking.css";
import { db } from "../Auth/firebase";
import { collection, getDocs } from "firebase/firestore";
   import { addWheelchairs } from "./database";

const BookingPage = () => {
  const [filters, setFilters] = useState("All");
  const [mobilityAids, setMobilityAids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the addWheelchairs function once to populate Firestore
    addWheelchairs();
  }, []);


  // Filter function for Firebase data
  const getFilteredItems = () => {
    if (filters === "Wheelchair")
      return mobilityAids.filter((item) => item.type === "Wheelchair");
    if (filters === "Crutches")
      return mobilityAids.filter((item) => item.type === "Crutches");
    return mobilityAids; // Show all items by default
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="booking-page">
      {/* Header */}
      <header className="header">
        <div className="logo">Sondo</div>
        <nav className="nav">
          <a href="#">Booking</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img
          src="https://via.placeholder.com/250" // Replace with actual mall image
          alt="Mall of Africa"
          className="mall-image"
        />
        <h2>Mall of Africa</h2>
      </section>

      {/* Filters */}
      <div className="filters">
        <button
          className={`filter-button ${filters === "All" ? "active" : ""}`}
          onClick={() => setFilters("All")}
        >
          All
        </button>
        <button
          className={`filter-button ${
            filters === "Wheelchair" ? "active" : ""
          }`}
          onClick={() => setFilters("Wheelchair")}
        >
          Wheelchair
        </button>
        <button
          className={`filter-button ${filters === "Crutches" ? "active" : ""}`}
          onClick={() => setFilters("Crutches")}
        >
          Crutches
        </button>
      </div>

      {/* List of Mobility Aids */}
      <div className="placeholder-list">
        {loading && <p>Loading mobility aids...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && filteredItems.length === 0 && (
          <p>No mobility aids available.</p>
        )}
        {!loading &&
          !error &&
          filteredItems.map((item) => (
            <div key={item.id} className="list-item">
              <span>{item.name}</span>
              {item.available ? (
                <button className="book-button">Book</button>
              ) : (
                <span className="unavailable">Unavailable</span>
              )}
            </div>
          ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;
