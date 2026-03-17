import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PENDING_TRIP_KEY = "pendingTripPlan";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [tripType, setTripType] = useState("Solo Trip");
  const [tripOption, setTripOption] = useState("Round Trip");

  const calculateDays = (start, end) => {
    if (!start || !end) {
      setDays("");
      return;
    }

    const startD = new Date(start);
    const endD = new Date(end);
    const diff = Math.round((endD - startD) / (1000 * 60 * 60 * 24));

    if (diff < 0) {
      setDays("");
      return;
    }

    setDays(diff + 1);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
    calculateDays(e.target.value, endDate);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    calculateDays(startDate, e.target.value);
  };

  const handleCreateTrip = async () => {
    const user = localStorage.getItem("user");
    const userEmail = localStorage.getItem("userEmail");

    if (!user) {
      const pendingTrip = {
        from: fromCity,
        to: toCity,
        startDate,
        endDate,
        days,
        tripType,
        tripOption
      };

      sessionStorage.setItem(PENDING_TRIP_KEY, JSON.stringify(pendingTrip));

      navigate("/login", {
        state: pendingTrip
      });
      return;
    }

    try {
      const data = {
        userEmail,
        fromCity,
        toCity,
        startDate,
        endDate,
        tripType,
        tripOption
      };

      await fetch("http://localhost:5000/api/trips/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log(error);
    }

    navigate("/tripdetails", {
      state: {
        from: fromCity,
        to: toCity,
        startDate,
        endDate,
        days,
        tripType,
        tripOption
      }
    });
  };

  useEffect(() => {
    if (location.state?.destination) {
      setToCity(location.state.destination);
    }
  }, [location]);

  const tripDurationLabel = days
    ? `${days} ${days === 1 ? "day" : "days"} selected`
    : "Ready when you are";

  const tripNights = days ? Math.max(days - 1, 0) : 0;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-backdrop" />

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">India Trip Planner</span>

            <h1>Build a beautiful trip plan in minutes, not spreadsheets.</h1>

            <p>
              Pick your route, lock your dates, and jump straight into curated
              stays, transport ideas, and destination details.
            </p>

            <div className="hero-stat-row">
              <div className="hero-stat-card">
                <strong>06+</strong>
                <span>Top destinations ready</span>
              </div>

              <div className="hero-stat-card">
                <strong>3</strong>
                <span>Trip styles for every vibe</span>
              </div>

              <div className="hero-stat-card">
                <strong>Fast</strong>
                <span>Plan and view trip details instantly</span>
              </div>
            </div>
          </div>

          <div className="planner-card">
            <div className="planner-head">
              <p className="planner-kicker">Trip Builder</p>
              <h2>Quick and easy trip planner</h2>
              <span className="planner-pill">{tripDurationLabel}</span>
            </div>

            <div className="form-row">
              <div>
                <label>From</label>
                <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
                  <option value="">Select City</option>
                  <option>Hyderabad</option>
                  <option>Bangalore</option>
                  <option>Chennai</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Kolkata</option>
                </select>
              </div>

              <div>
                <label>To</label>
                <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
                  <option value="">Select Destination</option>
                  <option>Goa</option>
                  <option>Manali</option>
                  <option>Kerala</option>
                  <option>Ooty</option>
                  <option>Jaipur</option>
                  <option>Andaman</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div>
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={handleStartDate} />
              </div>

              <div>
                <label>End Date</label>
                <input type="date" value={endDate} onChange={handleEndDate} />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label>Trip Option</label>
                <select value={tripOption} onChange={(e) => setTripOption(e.target.value)}>
                  <option>Round Trip</option>
                  <option>One Way</option>
                  <option>Multi-city</option>
                </select>
              </div>

              <div>
                <label>Trip Type</label>
                <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                  <option>Solo Trip</option>
                  <option>Family Trip</option>
                  <option>Friends Getaway</option>
                </select>
              </div>
            </div>

            <div className="planner-summary">
              <span>{fromCity || "City"} to {toCity || "Destination"}</span>
              <span>{tripType}</span>
            </div>

            <div className="planner-duration-panel">
              <div className="duration-card">
                <strong>{days || "--"}</strong>
                <span>Total Days</span>
              </div>

              <div className="duration-card">
                <strong>{days ? tripNights : "--"}</strong>
                <span>Nights</span>
              </div>

              <div className="duration-card">
                <strong>{tripOption}</strong>
                <span>Trip Option</span>
              </div>
            </div>

            <button className="create-btn" onClick={handleCreateTrip}>
              Create Trip
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
