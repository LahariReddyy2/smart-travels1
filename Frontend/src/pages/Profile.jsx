import { useState } from "react";
import "./Profile.css";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    mobile: storedUser.mobile || "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
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
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: user.password
      })
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      localStorage.setItem("user", JSON.stringify(data.user));

       toast.info("ℹ User profile updated");

    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.log(error);
    toast.error("Server error");
  }
};

  return (
    <div className="profile-page">
      <BackButton />

      <div className="profile-container">
        <h2>User Profile</h2>

         <form className="profile-form" onSubmit={(e)=>e.preventDefault()}>

          <label>Name</label>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <label>Email</label>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
            />
          </div>

          <label>Mobile</label>
          <div className="input-box">
            <FaPhone className="icon" />
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

            <button
               type="button"
               className="profile-btn"
               onClick={() => {
                 console.log("Save clicked");
                 handleSave();
               }}
            >
              Save Changes
            </button>

        </form>
      </div>

    </div>
  );
}

export default Profile;
