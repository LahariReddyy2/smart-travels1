 import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Offers from "./pages/Offers";
import Destination from "./pages/Destination";
import Dashboard from "./pages/Dashboard";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import Profile from "./pages/profile";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/tripdetails" element={<TripDetails />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
