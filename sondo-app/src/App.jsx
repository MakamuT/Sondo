// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Auth/login";
import LandingPage from "./Landing/Landingpage";
import Register from "./Auth/Register";
import Booking from "./Booking/booking";
import Confirmation from "./Booking/Confirmation";
import Home from "./Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App" data-theme="dark">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Default route for "/" */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/confirmation" element={ <Confirmation /> }/>
              <Route path="/register" element={<Register />} />
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