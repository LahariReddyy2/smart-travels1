 import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState}  from "react";
import { useNavigate } from "react-router-dom";
 function Navbar({ isLoggedIn, setIsLoggedIn }) {

const navigate = useNavigate();

const handleLogout = () => {

localStorage.removeItem("user");
setIsLoggedIn(false);
navigate("/login");

};

  return (
    <nav className="navbar">

      <div className="logo">SMART TRAVELS</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/offers">Offers</Link></li>
        <li><Link to="/destination">Destination</Link></li>

         
      </ul>

      <div className="auth-buttons">

<Link to="/login">
<button className="login-btn">Login</button>
</Link>

{/* Profile Menu */}

<div className="profile-menu">

 <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
className="profile-icon"/>

<div className="profile-dropdown">

<Link to="/my-trips"><p>My Trips</p></Link>

<Link to="/bookings"><p>My Bookings</p></Link>

<Link to="/saved-places"><p>Saved Places</p></Link>

<Link to="/travel-history"><p>Travel History</p></Link>

<div className="profile-item logout" onClick={handleLogout}>
Logout

</div>

</div>

</div>
</div>
   </nav>
  );
}

export default Navbar;