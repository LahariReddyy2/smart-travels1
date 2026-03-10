 import "./Home.css";
 import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Home() {

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("");

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const[tripType,setTripType]=useState("Solo Trip");
   const [tripOption, setTripOption] = useState("Round Trip");

  const calculateDays = (start, end) => {
    if(start && end){
      const startD = new Date(start);
      const endD = new Date(end);

      const diff = endD - startD;

      const totalDays = diff / (1000 * 60 * 60 * 24);

      setDays(totalDays);
    }
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
    navigate("/login", {
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
    return;
  }

  // SEND TRIP DATA TO BACKEND
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

 
const location = useLocation();
useEffect(() => {
if (location.state?.destination) {
setToCity(location.state.destination);
}
}, [location]);

  return (

    <div className="home">

      <div className="hero">

        <h1>Explore the World with SMART TRAVELS ✈</h1>
        <p>Find amazing destinations and best travel deals.</p>

        <div className="planner">

          <h2>Quick and easy trip planner</h2>

          <div className="form-row">

            <div>
              <label>From</label>

              <select value={fromCity} onChange={(e)=>setFromCity(e.target.value)}>
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

              <select value={toCity} onChange={(e)=>setToCity(e.target.value)}>
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
              <input type="date" value={startDate} onChange={handleStartDate}/>
            </div>

            <div>
              <label>End Date</label>
              <input type="date" value={endDate} onChange={handleEndDate}/>
            </div>

          </div>

          <div className="form-row">

            <div>
              <label>Trip Option</label>
               <select value={tripOption} onChange={(e)=>setTripOption(e.target.value)}>
                <option>Round Trip</option>
                <option>One Way</option>
                <option>Multi-city</option>
              </select>
            </div>

            <div>
              <label>Trip Type</label>
              <select
                value={tripType}
                onChange={(e)=>
                setTripType(e.target.value)}
                >
                <option>Solo Trip</option>
                <option>Family Trip</option>
                <option>Friends Getaway</option>
              </select>
            </div>

          </div>
 
          <button
          className="create-btn"
          onClick= {handleCreateTrip}
          >
            Create Trip
          </button>

        </div>

      </div>

    </div>

  );
}


export default Home;