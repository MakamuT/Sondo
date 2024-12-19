import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Auth/Profile";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* Default route for "/" */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
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