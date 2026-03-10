 import { useEffect, useState } from "react";

function MyTrips() {

const [trips, setTrips] = useState([]);


// DESTINATION IMAGES
const getDestinationImage = (destination) => {

const images = {

Goa: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",

Manali: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

Kerala: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",

Ooty:  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

Jaipur: "https://images.unsplash.com/photo-1599661046289-e31897846e41",

Andaman: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3"

};

return images[destination] || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";

};



// DELETE TRIP FUNCTION
const deleteTrip = async (id) => {

await fetch(`http://localhost:5000/api/trips/delete/${id}`,{
method:"DELETE"
});

setTrips(trips.filter((trip)=>trip._id !== id));

};



useEffect(() => {

const fetchTrips = async () => {

const email = localStorage.getItem("userEmail");

const res = await fetch(`http://localhost:5000/api/trips/mytrips/${email}`);

const data = await res.json();

setTrips(data);

};

fetchTrips();

}, []);



return (

<div style={{padding:"40px"}}>

<h2>My Trips</h2>

{trips.length === 0 ? (
<p>No trips created yet</p>
) : (

trips.map((trip,index)=>(

<div
key={index}
style={{
border:"1px solid #ddd",
padding:"15px",
margin:"10px 0",
borderRadius:"8px"
}}
>

{/* TRIP IMAGE */}
<img
src={trip.image || getDestinationImage(trip.toCity)}
style={{width:"100%",height:"200px",objectFit:"cover",borderRadius:"8px"}}
/>

<h3>{trip.fromCity} → {trip.toCity}</h3>

<p>{trip.startDate} to {trip.endDate}</p>

<p>{trip.tripType}</p>

<p>{trip.tripOption}</p>

<p>Status: {trip.status}</p>


{/* DELETE BUTTON */}
<button
onClick={() => deleteTrip(trip._id)}
style={{
marginTop:"10px",
background:"red",
color:"white",
border:"none",
padding:"8px 12px",
borderRadius:"5px",
cursor:"pointer"
}}
>
Delete Trip
</button>

</div>

))

)}

</div>

);

}

export default MyTrips;