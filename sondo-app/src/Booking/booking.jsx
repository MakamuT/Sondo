import { useState, useEffect } from "react";
import "./Booking.css";
import { db } from "../Auth/firebase";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const BookingPage = () => {
  const [mobilityAids, setMobilityAids] = useState([
    { id: "1", name: "Standard Wheelchair", type: "Wheelchair", available: true },
    { id: "2", name: "Electric Wheelchair", type: "Wheelchair", available: true },
    { id: "3", name: "Folding Wheelchair", type: "Wheelchair", available: false },
  ]);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [availableWheelchairs, setAvailableWheelchairs] = useState([]);

  useEffect(() => {
    // Fetch mobility aids
    fetchMobilityAids();

    // Fetch authenticated user details
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "Guest",
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

 useEffect(() => {
  const available = mobilityAids.filter(
    (item) => item.type === "Wheelchair" && item.available
  );
  setAvailableWheelchairs(available);
}, [mobilityAids]);


  const bookMobilityAid = async (item) => {
    if (!user) {
      toast.error("Please log in to make a booking", {
        position: "top-center",
      });
      return;
    }

    const itemRef = doc(db, "mobilityAids", item.id);
    try {
      await updateDoc(itemRef, {
        available: false,
        bookedBy: {
          uid: user.uid,
          name: user.name,
          email: user.email,
        },
        bookedAt: new Date(),
      });
      setMobilityAids((prev) =>
        prev.map((aid) =>
          aid.id === item.id
            ? { ...aid, available: false, bookedBy: user }
            : aid
        )
      );
      toast.success("Booking successful", { position: "top-center" });
    } catch (error) {
      console.error("Error booking wheelchair:", error);
      toast.error("Failed to book wheelchair", { position: "bottom-center" });
    }
  };

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
      toast.error("Failed to load data");
    }
  };

  const renderMobilityAids = () => {
    return (
      <div className="wheelchair-list">
        {loading ? (
          <p>Loading wheelchairs...</p>
        ) : availableWheelchairs.length > 0 ? (
          availableWheelchairs.map((item) => (
            <div key={item.id} className="list-item">
              <span>{item.name}</span>
              <button onClick={() => bookMobilityAid(item)}>Book</button>
            </div>
          ))
        ) : (
          <p>No available wheelchairs at the moment.</p>
        )}
      </div>
    );
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

      <section className="hero">
        <h2>Available Wheelchairs</h2>
        {user ? (
          <p>
            Logged in as <strong>{user.name}</strong> ({user.email})
          </p>
        ) : (
          <p>Please log in to book a wheelchair.</p>
        )}
      </section>

      {/* Render the wheelchair list */}
      {renderMobilityAids()}

      <footer className="footer">
        <p>&copy; 2024 Sondo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BookingPage;
