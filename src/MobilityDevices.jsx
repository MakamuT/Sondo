// Importing necessary libraries and hooks
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

// MobilityDevices component definition
function MobilityDevices({ mallId }) {
  // State variable to store the list of devices
  const [devices, setDevices] = useState([]);

  // useEffect hook to update devices when mallId changes
  useEffect(() => {
    // Simulate database call with mock data
    const mockData = {
      mall1: ["Wheelchair", "Scooter"],
      mall2: ["Wheelchair", "Scooter"],
      mall3: ["Scooter", "Walker"],
      mall4: ["Wheelchair", "Cane", "Scooter"],
      mall5: ["Wheelchair", "Scooter", "Walker"],
      mall6: ["Cane", "Scooter"],
      mall7: ["Wheelchair", "Walker"],
      mall8: ["Scooter"],
      mall9: ["Wheelchair", "Scooter", "Walker"],
      mall10: ["Wheelchair", "Scooter", "Crutches"],
    };

    // Set devices based on the selected mallId
    setDevices(mockData[mallId] || []);
  }, [mallId]);

  return (
    <div className="mobility-devices">
      <h3>Available Mobility Devices</h3>
      {devices.length > 0 ? (
        // Display list of devices if available
        <ul>
          {devices.map((device, index) => (
            <li key={index}>{device}</li>
          ))}
        </ul>
      ) : (
        // Display message if no devices are available
        <p>No devices available at this mall.</p>
      )}
    </div>
  );
}

// PropTypes validation for the mallId prop
MobilityDevices.propTypes = {
  mallId: PropTypes.string.isRequired,
};

export default MobilityDevices;
