 import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

        {!isLoggedIn ? (

          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>

        ) : (

          <div className="profile-menu">

            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="profile"
              className="profile-icon"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="profile-dropdown">
                <Link to="/profile"><p>Profile</p></Link>

                <Link to="/my-trips"><p>My Trips</p></Link>

                <Link to="/saved-places"><p>Saved Places</p></Link>

                <Link to="/travel-history"><p>Travel History</p></Link>

                <Link to="/settings"><p>Settings</p></Link>

                <hr />

                <div className="profile-item logout" onClick={handleLogout}>
                  Logout
                </div>

              </div>
            )}

          </div>

        )}

      </div>

    </nav>
  );
}

export default Navbar;