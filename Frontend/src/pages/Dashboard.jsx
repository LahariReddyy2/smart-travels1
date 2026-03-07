 import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">

      <div className="welcome">
        <h1>Welcome to SMART TRAVELS ✈</h1>
        <p>Plan your trips easily and explore amazing destinations.</p>
      </div>

      <div className="planner-card">
        <h2>Quick and easy trip planner</h2>

        <div className="form-row">
          <div className="input-box">
            <label>From</label>
            <input type="text" placeholder="e.g., Hyderabad" />
          </div>

          <div className="input-box">
            <label>To</label>
            <input type="text" placeholder="e.g., Ooty, India" />
          </div>
        </div>

        <div className="form-row">
          <div className="input-box">
            <label>Trip Option</label>
            <select>
              <option>Round Trip</option>
              <option>One Way</option>
              <option>Multi-city</option>
            </select>
          </div>

          <div className="input-box">
            <label>Trip Type</label>
            <select>
              <option>Solo Trip</option>
              <option>Family Trip</option>
              <option>Friends Getaway</option>
            </select>
          </div>
        </div>

        <button className="create-btn">Create Trip</button>
      </div>

    </div>
  );
}

export default Dashboard;