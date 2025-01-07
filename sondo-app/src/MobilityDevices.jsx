import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function MobilityDevices({ mallId }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Simulate API call with mock data
    const mockData = {
      mall1: ["Wheelchair", "Scooter"],
      mall2: ["Walker", "Cane"],
    };

    setDevices(mockData[mallId] || []);
  }, [mallId]);

  return (
    <div className="mobility-devices">
      <h3>Available Mobility Devices</h3>
      {devices.length > 0 ? (
        <ul>
          {devices.map((device, index) => (
            <li key={index}>{device}</li>
          ))}
        </ul>
      ) : (
        <p>No devices available at this mall.</p>
      )}
    </div>
  );
}
MobilityDevices.propTypes = {
  mallId: PropTypes.string.isRequired,
};

export default MobilityDevices;
