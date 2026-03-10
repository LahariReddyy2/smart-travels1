import { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
     const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const saveChanges = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">

      <div className="profile-card">

        <h2>User Profile</h2>

        <div className="profile-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            disabled={!editMode}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
          />
        </div>

        <div className="profile-field">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={user.mobile}
            disabled={!editMode}
            onChange={handleChange}
          />
        </div>

        {!editMode ? (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="save-btn" onClick={saveChanges}>
            Save Changes
          </button>
        )}

      </div>

    </div>
  );
}

export default Profile;