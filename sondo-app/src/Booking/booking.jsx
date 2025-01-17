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
import Header from "../Home/Header"

const BookingPage = () => {
  const [wheelchairs, setWheelchairs] = useState([]); 
  const [selectedWheelchair, setSelectedWheelchair] = useState(null);
  const [filters, setFilters] = useState("All");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchWheelchairs = async () => {
      setLoading(true);
      try {
        /**
         * Creates a Firestore query to fetch wheelchairs based on availability or type.
         *
         * @param {Object} db - The Firestore database instance.
         * @param {string} filters - The filter criteria for the query. If "All", fetches available wheelchairs. Otherwise, fetches wheelchairs of the specified type.
         * @returns {Query} A Firestore query object to fetch the filtered wheelchairs.
         */
        const q = query(
          collection(db, "wheelchairs"),
          filters === "All"
            ? where("available", "==", true)
            : where("type", "==", filters)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Wheelchairs:", data);
        setWheelchairs(data);
      } catch (error) {
        console.error("Error fetching wheelchairs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWheelchairs();
  }, [db, filters]);

  const handleBooking = async (wheelchairId) => {
    if (!auth.currentUser) {
      setMessage("You need to log in to make a booking.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const bookingRef = doc(collection(db, "bookings"));
      await setDoc(bookingRef, {
        userId: auth.currentUser.uid,
        wheelchairId,
        bookingTime: new Date().toISOString(),
      });

      const wheelchairRef = doc(db, "wheelchairs", wheelchairId);
      await setDoc(wheelchairRef, { available: false }, { merge: true });

      setMessage("Booking successful!");

      // Refresh the wheelchair list
      const q = query(
        collection(db, "wheelchairs"),
        filters === "All"
          ? where("available", "==")
          : where("type", "==", filters)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWheelchairs(data);
    } catch (error) {
      console.error("Error making booking:", error);
      setMessage("Failed to make booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      {Header()}
      <section className="hero">
        <img
          src="https://via.placeholder.com/250"
          alt="Mall of Africa"
          className="mall-image"
        />
        <h2>Mall of Africa</h2>
      </section>

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
        <button
          className={`filter-button ${filters === "Crutches" ? "active" : ""}`}
          onClick={() => setFilters("Crutches")}
        >
          Crutches
        </button>
      </div>

      <div className="item-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          wheelchairs.map((item) => (
            <div key={item.id} className="list-item">
              <span>{item.name}</span>
              {item.available ? (
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
        )}
      </div>

      {message && <p className="message">{message}</p>}

      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;
