import { useState, useEffect } from "react";
import "./Booking.css";
import { db } from "../Auth/firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const BookingPage = () => {
  const [filters, setFilters] = useState("All");
  const [mobilityAids, setMobilityAids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   const fetchMobilityAids = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "mobilityAids"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMobilityAids(items);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching mobility aids:", error); 
  }
};

    fetchMobilityAids();
  }, []);

  const wheelchairs = [
    { id: 1, name: "Wheelchair 1", available: true },
    { id: 2, name: "Wheelchair 2", available: false },
    { id: 3, name: "Wheelchair 3", available: true },
  ];
  // Filter function
  const getFilteredItems = () => {
    if (filters === "Wheelchair") return wheelchairs;
    return [...wheelchairs, ...crutches];
  };

  const filteredItems = getFilteredItems();
  
  const handleBook = async (id) => {
  console.log("Booking ID:", id);
  try {
    const itemRef = doc(db, "mobilityAids", String(id));
    await updateDoc(itemRef, {
      available: false,
    });
    // Optimistically update the UI
    setMobilityAids((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, available: false } : item
      )
    );

    toast.success("Booking successful!",{
      position: "top-center",
    });
  } catch (error) {
    console.error("Error booking mobility aid");
    toast.error("Failed to book. Please try again.",{
      position: "bottom-center",
    });
  }
};


  return (
    <div className="booking-page">
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

      {/* Filters */}
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
              <button className="book-button" onClick={() => handleBook(item.id)}>Book</button>
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