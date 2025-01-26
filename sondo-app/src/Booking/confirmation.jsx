import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Confirmation.css";
const ConfirmationPage = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  if (!bookingDetails) {
    return <p>No booking details available. Please book a wheelchair first.</p>;
  }

  const formatBookingTime = (bookingTime) => {
    const date = new Date(bookingTime);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options);
  };

  return (
    <div className="confirmation-page">
      <h1>Booking Confirmation</h1>
      {/* <p>
        <strong>Name:</strong> {bookingDetails.userName}
      </p> */}
      <p>
        <strong>Email:</strong> {bookingDetails.userEmail}
      </p>
      <p>
        <strong>Wheelchair:</strong> {bookingDetails.wheelchairName}
      </p>
      <p>
        <strong>Booking Time:</strong> {formatBookingTime(bookingDetails.bookingTime)}
      </p>
      <Link to="/booking">
        <button className="back-button">Book Another Wheelchair</button>
      </Link>
    </div>
  );
};

export default ConfirmationPage;
