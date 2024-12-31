// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/Login";
import LandingPage from "./Landingpage";
import Register from "./Auth/Register";
import About from "./About";
import Booking from './booking';
import Confirmation from "./confirmation";
import Home from "./home";
import BookingPage from "./booking";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Default route for "/" */}
              <Route path="/" element={<LandingPage/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/confirmation" element={<Confirmation />} />

              {/* Fallback for undefined routes */}
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;