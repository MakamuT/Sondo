import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Header from "../Home/Header";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mallName } = location.state || {};
  const [wheelchairs, setWheelchairs] = useState([]);
  const [filters, setFilters] = useState("All");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const db = getFirestore();
  const auth = getAuth();

// Fetch wheelchairs based on the selected mall name
useEffect(() => {
  const fetchWheelchairs = async () => {
    setLoading(true);
    try {
      console.log("Fetching wheelchairs for mall:", mallName);

      // Get all wheelchairs for the selected mall
const wheelchairQuery = query(
  collection(db, "wheelchairs"),
  where("mallname", "==", mallName)
);


      const querySnapshot = await getDocs(wheelchairQuery);
      console.log("Query Snapshot:", querySnapshot.docs);

      // Map the results to an array of wheelchair objects
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWheelchairs(data);
    } catch (error) {
      console.error("Error fetching wheelchairs:", error);
      setMessage("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  fetchWheelchairs();
}, [mallName, db]);

  

  // Booking logic
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
      });

      // Mark wheelchair as unavailable
      const wheelchairRef = doc(db, "wheelchairs", wheelchairId);
      await setDoc(wheelchairRef, { availability: false }, { merge: true });

      // Booking details to pass to confirmation page
      const bookingDetails = {
        userName: user.displayName || "Anonymous",
        userEmail: user.email || "No Email",
        wheelchairName: wheelchairs.find((wc) => wc.id === wheelchairId).name,
        mallName,
        bookingTime,
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

      <div className="mall-image-section">
        <img
        src={`https://via.placeholder.com/600x300?text=${mallName || "Selected Mall"}`}
        alt={mallName || "Mall"}
        className="mall-image"/>
        <h2>{mallName || "Mall"}</h2>
        </div>

      {/* Filter Buttons
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
      </div> */}
      
      {/* Wheelchair List */}
      <div className="item-list">
        {loading ? (
          <p>Loading...</p>) : wheelchairs.length > 0 ? (
            wheelchairs.map((item) => (
            <div key={item.id} className="list-item">     <span>{item.name}</span>
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
    <p>No wheelchairs available for {mallName}.</p>
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
