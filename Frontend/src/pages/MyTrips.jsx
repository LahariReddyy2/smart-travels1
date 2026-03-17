import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import BackButton from "../components/BackButton";
import "./MyTrips.css";

function MyTrips({ embedded = false }) {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);

  const getDestinationImage = (destination) => {
    const images = {
      Goa: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      Manali: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      Kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
      Ooty: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      Jaipur: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
      Andaman: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3"
    };

    return images[destination] || images.Goa;
  };

  const fetchTrips = async () => {
    const email = localStorage.getItem("userEmail");
    const res = await fetch(`http://localhost:5000/api/trips/mytrips/${email}`);
    const data = await res.json();
    setTrips(data);
  };

  const startEdit = (trip) => {
    setEditingTrip({ ...trip });
  };

  const updateTrip = async () => {
    await fetch(`http://localhost:5000/api/trips/update/${editingTrip._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editingTrip)
    });

    await fetchTrips();
    setEditingTrip(null);
  };

  const openTripDetails = (trip) => {
    navigate("/tripdetails", {
      state: {
        from: trip.fromCity,
        to: trip.toCity,
        startDate: trip.startDate,
        endDate: trip.endDate,
        tripType: trip.tripType,
        tripOption: trip.tripOption
      }
    });
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className={`mytrips-page ${embedded ? "embedded" : ""}`}>
      {!embedded && (
        <BackButton />
      )}

      <div className="mytrips-header">
        <p className="mytrips-kicker">Saved Journeys</p>
        <h2>{embedded ? "Your Trips" : "My Trips"}</h2>
        <p>
          Review what you have planned and make quick updates without losing the
          overall flow of your trip.
        </p>
      </div>

      {trips.length === 0 ? (
        <div className="mytrips-empty">
          <h3>No trips created yet</h3>
          <p>Once you create a trip, it will appear here for quick access.</p>
        </div>
      ) : (
        <div className="mytrips-grid">
          {trips.map((trip, index) => (
            <article
              className="trip-card"
              key={index}
              onClick={() => openTripDetails(trip)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openTripDetails(trip);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img
                src={trip.image || getDestinationImage(trip.toCity)}
                className="trip-card-image"
                alt={trip.toCity}
              />

              <div className="trip-card-body">
                <div className="trip-card-top">
                  <span className="trip-badge">{trip.status}</span>
                  <h3>{trip.fromCity} to {trip.toCity}</h3>
                </div>

                <div className="trip-meta">
                  <span>{trip.startDate} to {trip.endDate}</span>
                  <span>{trip.tripType}</span>
                  <span>{trip.tripOption}</span>
                </div>

                <button
                  className="trip-edit-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    startEdit(trip);
                  }}
                >
                  <HiOutlinePencilSquare />
                  Edit Trip
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editingTrip && (
        <div className="trip-modal-overlay" onClick={() => setEditingTrip(null)}>
          <div className="trip-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Trip</h3>

            <label>Start Date</label>
            <input
              type="date"
              value={editingTrip.startDate}
              onChange={(e) => setEditingTrip({ ...editingTrip, startDate: e.target.value })}
            />

            <label>End Date</label>
            <input
              type="date"
              value={editingTrip.endDate}
              onChange={(e) => setEditingTrip({ ...editingTrip, endDate: e.target.value })}
            />

            <label>Trip Type</label>
            <select
              value={editingTrip.tripType}
              onChange={(e) => setEditingTrip({ ...editingTrip, tripType: e.target.value })}
            >
              <option>Solo Trip</option>
              <option>Family Trip</option>
              <option>Friends Getaway</option>
            </select>

            <label>Trip Option</label>
            <select
              value={editingTrip.tripOption}
              onChange={(e) => setEditingTrip({ ...editingTrip, tripOption: e.target.value })}
            >
              <option>Round Trip</option>
              <option>One Way</option>
              <option>Multi-city</option>
            </select>

            <div className="trip-modal-actions">
              <button className="trip-save-btn" onClick={updateTrip}>
                Save Changes
              </button>

              <button className="trip-cancel-btn" onClick={() => setEditingTrip(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyTrips;
