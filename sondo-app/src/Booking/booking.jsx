import { useState, useEffect } from "react";
import "./Booking.css";
import { collection, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
//import { db } from "./Auth/firebase";
 
const BookingPage = ({user}) => {
  // Sample data for available mobility aids
  const [filters, setFilters] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const wheelchairs = [
    { id: 1, name: "Wheelchair 1", available: true },
    { id: 2, name: "Wheelchair 2", available: false },
    { id: 3, name: "Wheelchair 3", available: true },
  ];

   useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const wheelchairsCollection = collection(db, "wheelchairs");
        const crutchesCollection = collection(db, "crutches");

        const [wheelchairsSnapshot, crutchesSnapshot] = await Promise.all([
          getDocs(wheelchairsCollection),
          getDocs(crutchesCollection),
        ]);

        const wheelchairs = wheelchairsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const crutches = crutchesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems([...wheelchairs, ...crutches]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

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

  const handleBook = async (item) => {
    if (!user) {
      toast.error("Please log in to book a mobility aid.", {position : "top-center",});
      return;
    }

    try {
      // Update item availability in Firestore
      const itemRef = doc(db, "wheelchairs", item.id); // Replace "wheelchairs" with your collection name
      await updateDoc(itemRef, { available: false });

      // Add booking details to Firestore
      const bookingsCollection = collection(db, "bookings");
      await addDoc(bookingsCollection, {
        userId: user.id, 
        userName: user.name,
        userEmail: user.email,
        itemId: item.id,
        itemName: item.name,
        bookingDate: new Date().toISOString(),
      });

      // Update local state
      setItems((prevItems) =>
        prevItems.map((i) =>
          i.id === item.id ? { ...i, available: false } : i
        )
      );

      toast.success(`Successfully booked ${item.name}`, {position: "top-center"});
    } catch (error) {
      console.error("Error handling booking:", error);
      toast.error("Failed to book the item. Please try again.", {position: "bottom-center"});
    }
  };


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
        <h2>Available {filters === "All" ? "Mobility Aids" : filters}</h2>
        {user ? (
          <p>
            Logged in as <strong>{user.name}</strong> ({user.email})
          </p>
        ) : (
          <p>Please log in to book a wheelchair.</p>
        )}
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
              <button className="book-button" onClick={() => handleBook(item)} >Book</button>
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
