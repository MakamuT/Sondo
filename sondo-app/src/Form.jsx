import React, { useState } from 'react';
import "./Home/home.css" // Import the CSS file

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    mallEntrance: '',
    checkoutTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="mallEntrance"
            value={formData.mallEntrance}
            onChange={handleChange}
            placeholder="Mall Entrance"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="datetime-local"
            name="checkoutTime"
            value={formData.checkoutTime}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
