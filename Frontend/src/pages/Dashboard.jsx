import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlineUserCircle
} from "react-icons/hi2";
import { RiSuitcaseLine } from "react-icons/ri";
import MyTrips from "./MyTrips";
import BackButton from "../components/BackButton";
import "./Dashboard.css";

function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [savedProfile, setSavedProfile] = useState({
    name: storedUser.name || "Traveler",
    email: storedUser.email || "",
    mobile: storedUser.mobile || ""
  });
  const initials = savedProfile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "T";

  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    name: savedProfile.name,
    email: savedProfile.email,
    mobile: savedProfile.mobile,
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Unable to update profile");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userEmail", data.user.email);

      setSavedProfile({
        name: data.user.name || "",
        email: data.user.email || "",
        mobile: data.user.mobile || ""
      });

      setFormData({
        name: data.user.name || "",
        email: data.user.email || "",
        mobile: data.user.mobile || "",
        password: ""
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");

    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }

    navigate("/login");
  };

  const renderContent = () => {
    if (activeSection === "trips") {
      return (
        <div className="dashboard-content-card trips-panel">
          <div className="dashboard-content-header">
            <h2>My Trips</h2>
            <p>Review and manage the trips you have created.</p>
          </div>

          <MyTrips embedded />
        </div>
      );
    }

    return (
      <div className="dashboard-content-card">
        <div className="dashboard-content-header">
          <h2>
            <HiOutlineUserCircle />
            Edit Profile
          </h2>
          <p>Update your name, mobile number, and password here.</p>
        </div>

        <form
          className="dashboard-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
          />

          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />

          <label>New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <button type="submit" className="dashboard-save-btn">
            <HiOutlineCheckCircle />
            Save Changes
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="dashboard-page">
      <BackButton />

      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="dashboard-sidebar-top">
            <p className="sidebar-label">Dashboard</p>

            <div className="sidebar-profile-card">
              <div className="sidebar-avatar">{initials}</div>

              <div className="sidebar-profile-copy">
                <p className="sidebar-greeting">Hello</p>
                <h2>{savedProfile.name || "Traveler"}</h2>
                <p className="sidebar-email">{savedProfile.email || "No email available"}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-sidebar-nav">
            <button
              className={`sidebar-btn ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => setActiveSection("profile")}
            >
              <HiOutlinePencilSquare />
              Edit Profile
            </button>

            <button
              className={`sidebar-btn ${activeSection === "trips" ? "active" : ""}`}
              onClick={() => setActiveSection("trips")}
            >
              <RiSuitcaseLine />
              My Trips
            </button>

            <button
              className="sidebar-btn logout-btn"
              onClick={handleLogout}
            >
              <HiOutlineArrowRightOnRectangle />
              Logout
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
