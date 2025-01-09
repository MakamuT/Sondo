import { useState } from "react";
import { useEffect } from "react";
import "./Booking.css";
import Header from "../header";

const BookingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    setUser({ name: "John Doe", email: "john.doe@example.com" });
  }, []);
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
      <Header />

      {/**** Hero Section *****/}
      <section className="hero">
        <img
          src="https://via.placeholder.com/250" // Replace with actual mall image URL
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
<<<<<<< Updated upstream
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
=======

      {/**** Items List ****/}
      <div className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="list-item">
              <span>{item.name}</span>
              {item.available ? (
                <button className="book-button">Book</button>
              ) : (
                <span className="unavailable">Unavailable</span>
              )}
            </div>
          ))
        ) : (
          <p>No items available for this filter.</p>
        )}
>>>>>>> Stashed changes
      </div>

      {/****** Footer *****/}
      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;