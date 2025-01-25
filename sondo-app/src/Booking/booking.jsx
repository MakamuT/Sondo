import { useState, useEffect } from "react";
import "./Booking.css";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Header from "../Home/Header";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [wheelchairs, setWheelchairs] = useState([]);
  const [selectedWheelchair, setSelectedWheelchair] = useState(null);
  const [filters, setFilters] = useState("All");
  const [mall, setMall] = useState("Mall of Africa"); // Default to "Mall of Africa"
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  // Fetch wheelchairs from Firestore
  useEffect(() => {
    const fetchWheelchairs = async () => {
      setLoading(true);
      try {
        // Query wheelchairs for the selected mall and apply filters
        const q = query(
          collection(db, "wheelchairs"),
          where("mallname", "==", mall)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWheelchairs(data);
      } catch (error) {
        console.error("Error fetching wheelchairs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWheelchairs();
  }, [db, mall]); // Re-run when the selected mall changes

  // Handle booking logic
  const handleBooking = async (wheelchairId) => {
    if (!wheelchairId) {
      setMessage("Please select a wheelchair to book.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setMessage("You need to log in to make a booking.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Save booking to Firestore
      const bookingRef = doc(collection(db, "bookings"));
      const bookingTime = new Date().toISOString();
      await setDoc(bookingRef, {
        userId: user.uid,
        wheelchairId,
        bookingTime,
        mallname: mall,
      });

      // Mark the wheelchair as unavailable
      const wheelchairRef = doc(db, "wheelchairs", wheelchairId);
      await setDoc(wheelchairRef, { availability: false }, { merge: true });

      // Booking details to pass to confirmation page
      const bookingDetails = {
        userName: user.displayName || "Anonymous",
        userEmail: user.email || "No Email",
        wheelchairName: wheelchairs.find((wc) => wc.id === wheelchairId).name,
        bookingTime,
        mallname: mall,
      };

      // Navigate to confirmation page
      navigate("/confirmation", { state: { bookingDetails } });

      // Update wheelchairs list
      setWheelchairs((prev) =>
        prev.map((wc) =>
          wc.id === wheelchairId ? { ...wc, availability: false } : wc
        )
      );
    } catch (error) {
      console.error("Error making booking:", error);
      setMessage("Failed to make booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <Header />
      <section className="hero">
        <img
          src="https://via.placeholder.com/250"
          alt={mall}
          className="mall-image"
        />
        <h2>{mall}</h2>
      </section>

      {/* Filter Buttons */}
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
          Wheelchairs
        </button>
      </div>

      {/* Wheelchair List */}
      <div className="item-list">
        {loading ? (
          <p>Loading...</p>
        ) : wheelchairs.length > 0 ? (
          wheelchairs.map((item) => (
            <div key={item.id} className="list-item">
              <span>{item.name}</span>
              {item.availability ? (
                <button
                  className="book-button"
                  onClick={() => handleBooking(item.id)}
                >
                  Book
                </button>
              ) : (
                <span className="unavailable">Unavailable</span>
              )}
            </div>
          ))
        ) : (
          <p>No wheelchairs available.</p>
        )}
      </div>

      {/* Message Display */}
      {message && <p className="message">{message}</p>}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage; 
