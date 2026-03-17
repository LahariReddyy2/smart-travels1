import { toast } from "react-toastify";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const PENDING_TRIP_KEY = "pendingTripPlan";

function Login({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const savePendingTrip = async (tripState, userEmail) => {
    if (!tripState?.from || !tripState?.to || !tripState?.startDate || !tripState?.endDate) {
      return;
    }

    try {
      await fetch("http://localhost:5000/api/trips/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userEmail,
          fromCity: tripState.from,
          toCity: tripState.to,
          startDate: tripState.startDate,
          endDate: tripState.endDate,
          tripType: tripState.tripType,
          tripOption: tripState.tripOption
        })
      });
    } catch (tripError) {
      console.log(tripError);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (result.message === "Login successful") {
        toast.success("Login successful");

        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userEmail", result.user.email);
        setIsLoggedIn(true);

        const storedPendingTrip = sessionStorage.getItem(PENDING_TRIP_KEY);
        const pendingTrip = location.state || (storedPendingTrip ? JSON.parse(storedPendingTrip) : null);

        if (pendingTrip?.from && pendingTrip?.to) {
          await savePendingTrip(pendingTrip, result.user.email);
          sessionStorage.removeItem(PENDING_TRIP_KEY);
          navigate("/tripdetails", { state: pendingTrip });
        } else {
          navigate("/");
        }
      } else if (result.message === "Invalid password") {
        toast.error("Incorrect password");
        setError(result.message);
      } else if (result.message === "User not found") {
        toast.error("User not found");
        setError(result.message);
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (fetchError) {
      toast.error("Server error");
      console.log(fetchError);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-copy-panel">
          <span className="auth-badge">Welcome Back</span>
          <h1>Continue planning your next great trip.</h1>
          <p>
            Sign in to view your saved journeys, edit your profile, and keep
            everything organized in one calm workspace.
          </p>

          <div className="auth-copy-points">
            <div className="auth-copy-item">
              <strong>Trips saved</strong>
              <span>Access your planned routes and trip details instantly.</span>
            </div>

            <div className="auth-copy-item">
              <strong>Easy updates</strong>
              <span>Manage profile info and travel plans without confusion.</span>
            </div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-card">
            <p className="auth-kicker">Sign In</p>
            <h2>Login to your account</h2>

            <form onSubmit={handleLogin}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="auth-error">{error}</p>}

              <button type="submit" className="auth-btn">
                Login
              </button>
            </form>

            <p className="auth-link-row">
              New to Smart Travels?
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => navigate("/register", { state: location.state })}
              >
                Create account
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
