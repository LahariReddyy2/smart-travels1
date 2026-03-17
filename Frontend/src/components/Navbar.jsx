import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  HiMiniArrowRightOnRectangle,
  HiMiniCalendarDays,
  HiMiniMap,
  HiMiniSquares2X2,
  HiMiniTicket,
  HiMiniUserCircle
} from "react-icons/hi2";
import { PiAirplaneTiltFill } from "react-icons/pi";
import "./Navbar.css";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = storedUser.name || "Traveler";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="brand-block">
        <div className="brand-mark">
          <PiAirplaneTiltFill />
        </div>
        <div className="brand-copy">
          <span className="brand-kicker">Travel Planner</span>
          <div className="logo">SMART TRAVELS</div>
        </div>
      </div>

      <div className="nav-shell">
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <HiMiniSquares2X2 />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/offers" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <HiMiniTicket />
              Offers
            </NavLink>
          </li>
          <li>
            <NavLink to="/destination" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <HiMiniMap />
              Destination
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to="/my-trips" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                <HiMiniCalendarDays />
                My Trips
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div className="profile-menu" ref={profileMenuRef}>
            <button
              type="button"
              className={`profile-trigger ${open ? "open" : ""}`}
              onClick={() => setOpen((value) => !value)}
            >
              <div className="profile-icon-shell">
                <HiMiniUserCircle className="profile-icon" />
              </div>

              <div className="profile-trigger-copy">
                <span className="profile-trigger-label">Hello,</span>
                <span className="profile-name-label">{userName}</span>
              </div>
            </button>

            {open && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-topline">
                  <span className="dropdown-chip">Quick Access</span>
                </div>

                <div className="profile-dropdown-links">
                  <Link
                    to="/dashboard"
                    className="profile-dropdown-link"
                    onClick={() => setOpen(false)}
                  >
                    <span className="profile-dropdown-icon">
                      <HiMiniSquares2X2 />
                    </span>
                    Dashboard
                  </Link>

                  <Link
                    to="/my-trips"
                    className="profile-dropdown-link"
                    onClick={() => setOpen(false)}
                  >
                    <span className="profile-dropdown-icon">
                      <HiMiniCalendarDays />
                    </span>
                    My Trips
                  </Link>

                  <button
                    type="button"
                    className="profile-dropdown-link profile-dropdown-logout"
                    onClick={handleLogout}
                  >
                    <span className="profile-dropdown-icon">
                      <HiMiniArrowRightOnRectangle />
                    </span>
                    Logout
                  </button>
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
