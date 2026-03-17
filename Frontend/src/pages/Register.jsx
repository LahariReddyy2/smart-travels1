import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !mobile || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      name,
      email,
      mobile,
      password
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.message === "Registration successful") {
        toast.success("Registration successful");
        navigate("/login", { state: location.state });
      } else if (result.message === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-copy-panel register-panel">
          <span className="auth-badge">New Account</span>
          <h1>Start with a calm, easy travel dashboard.</h1>
          <p>
            Create your account to save journeys, revisit ideas, and manage your
            plans without digging through chats or notes.
          </p>

          <div className="auth-copy-points">
            <div className="auth-copy-item">
              <strong>Personal dashboard</strong>
              <span>Keep your profile and trip plans organized in one place.</span>
            </div>

            <div className="auth-copy-item">
              <strong>Cleaner planning</strong>
              <span>Build trips quickly with a guided flow that feels simple.</span>
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-card">
            <p className="auth-kicker">Create Account</p>
            <h2>Register with Smart Travels</h2>

            <form onSubmit={handleRegister}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button type="submit" className="auth-btn">
                Create Account
              </button>
            </form>

            <p className="auth-link-row">
              Already have an account?
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => navigate("/login", { state: location.state })}
              >
                Login
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
