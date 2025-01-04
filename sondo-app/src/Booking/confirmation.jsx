import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Confirmation() {
  const location = useLocation();
  const  navigate = useNavigate();
  const { bookedItem } = location.state || {};

  return (
    <div className='conpage'>
      <h1>Booking Confirmation</h1>
      {bookedItem ? (
        <>
        <p><strong>Item:</strong> {bookedItem.name}</p>
        <p>Your booking is confirmed! Thank you for using Sondo.</p>
        </>
      ) : (<p>No booking details found.</p>
      )}
      <button onClick={() => navigate("/home")}>Home</button>
      </div>
  );
};

export default Confirmation;
