import { useState } from "react";
import "./Booking.css";

const BookingPage = () => {
  // Sample data for available mobility aids
  const [filters, setFilters] = useState("All");

  const wheelchairs = [
    { id: 1, name: "Wheelchair 1", available: true },
    { id: 2, name: "Wheelchair 2", available: false },
    { id: 3, name: "Wheelchair 3", available: true },
  ];

  const crutches = [
    { id: 4, name: "Crutches 1", available: true },
    { id: 5, name: "Crutches 2", available: true },
  ];

  // Filter function
  const getFilteredItems = () => {
    if (filters === "Wheelchair") return wheelchairs;
    if (filters === "Crutches") return crutches;
    return [...wheelchairs, ...crutches];
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="booking-page">
      {/**** Header ****/}
      <header className="header">
        <div className="logo">Sondo</div>
        <nav className="nav">
          <a href="#">Booking</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
        </nav>
      </header>

      {/**** Hero Section *****/}
      <section className="hero">
        <img
          src="https://via.placeholder.com/250" // Replace with actual mall image
          alt="Mall of Africa"
          className="mall-image"
        />
        <h2>Mall of Africa</h2>
      </section>

      {/**** Filters ****/}
      <div className="filters">
        <button
          className={`filter-button ${filters === "All" ? "active" : ""}`}
          onClick={() => setFilters("All")}
        >
          All
        </button>
        <button
          className={`filter-button ${filters === "Wheelchair" ? "active" : ""}`}
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

      {/**** Placeholder List ****/}
      <div className="placeholder-list">
        {filteredItems.map((item) => (
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

      {/****** Footer *****/}
      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;
