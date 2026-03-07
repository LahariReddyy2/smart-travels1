 import "./Destination.css";
import { useNavigate } from "react-router-dom";

function Destination() {

const navigate = useNavigate();

const places = [
{
name: "Goa",
image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
desc: "Famous for beaches, nightlife and Portuguese heritage.",
rating: "4.6",
bestTime: "Nov – Feb"
},
{
name: "Manali",
image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
desc: "Beautiful hill station with snow mountains and adventure sports.",
rating: "4.7",
bestTime: "Oct – Feb"
},
{
name: "Kerala",
image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
desc: "Known for backwaters, houseboats and lush greenery.",
rating: "4.8",
bestTime: "Sep – Mar"
},
{
name: "Ooty",
image: "https://images.unsplash.com/photo-1518684079-3c830dcef090",
desc: "Popular hill station with tea gardens and cool climate.",
rating: "4.5",
bestTime: "Oct – Jun"
},
{
name: "Jaipur",
image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
desc: "The Pink City famous for palaces and royal heritage.",
rating: "4.4",
bestTime: "Nov – Mar"
},
{
name: "Andaman",
image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
desc: "Crystal clear beaches and one of the best island destinations.",
rating: "4.7",
bestTime: "Nov – May"
}
];

return (
<div className="destination-page">

<h1>Popular Destinations ✈</h1>

<div className="destination-container">

{places.map((place, index) => (

<div
className="destination-card"
key={index}
onClick={() => navigate("/", { state: { destination: place.name } })}
>

<img src={place.image} alt={place.name} />

<div className="destination-content">

<h3>{place.name}</h3>

<p>{place.desc}</p>

<p className="rating">⭐ Rating: {place.rating}</p>

<p className="best-time">🗓 Best time: {place.bestTime}</p>

<button
className="explore-btn"
onClick={(e) => {
e.stopPropagation();
navigate("/", { state: { destination: place.name } });
}}
>
Explore
</button>

</div>

</div>

))}

</div>

</div>
);
}

export default Destination;