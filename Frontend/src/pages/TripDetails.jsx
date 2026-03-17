import { useLocation } from "react-router-dom";
import {
  HiOutlineBolt,
  HiOutlineBuildingOffice2,
  HiOutlineCloud,
  HiOutlineExclamationTriangle,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineSparkles
} from "react-icons/hi2";
import { LuBus, LuTrainFront } from "react-icons/lu";
import BackButton from "../components/BackButton";
import "./TripDetails.css";

function TripDetails() {
  const location = useLocation();
  const state = location.state || {};

  const from = state.from || "Unknown";
  const to = state.to || "Manali";
  const displayStartDate = state.startDate || state.start || "2026-01-01";
  const displayEndDate = state.endDate || state.end || "2026-01-02";
  const displayTripOption = state.tripOption || state.option || "One Way";
  const displayTripType = state.tripType || state.type || "Solo Trip";

  const startDate = new Date(displayStartDate);
  const endDate = new Date(displayEndDate);
  const calculatedDays = Math.max(
    Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1,
    1
  );
  const totalDays = Number(state.days) || calculatedDays;

  const transportPrices = {
    Goa: { flight: 4500, train: 1200, bus: 900 },
    Manali: { flight: 6500, train: 1800, bus: 1400 },
    Kerala: { flight: 5000, train: 1500, bus: 1100 },
    Ooty: { flight: 4000, train: 1300, bus: 1000 },
    Jaipur: { flight: 4800, train: 1400, bus: 950 },
    Andaman: { flight: 9000, train: 0, bus: 0 }
  };

  const getPriceRange = (price) => {
    if (!price) {
      return "Not available";
    }

    const min = Math.floor(price * 0.8);
    const max = Math.floor(price * 1.2);
    return `Rs. ${min} - Rs. ${max}`;
  };

  const flightCost = transportPrices[to]?.flight || 0;
  const trainCost = transportPrices[to]?.train || 0;
  const busCost = transportPrices[to]?.bus || 0;

  const hotels = {
    Goa: {
      budget: [
        {
          name: "Goa Budget Stay",
          image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
          desc: "Affordable stay near Baga Beach",
          rating: 3.8,
          price: 1200,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8887776666"
        },
        {
          name: "Beach Budget Inn",
          image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
          desc: "Budget friendly hotel near beach",
          rating: 3.6,
          price: 1000,
          timing: "Check-in 1PM | Check-out 11AM",
          contact: "91-8882221111"
        }
      ],
      standard: [
        {
          name: "Goa Paradise Hotel",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
          desc: "Comfortable stay near beach attractions",
          rating: 4.2,
          price: 2500,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7776665555"
        },
        {
          name: "Ocean Comfort Resort",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          desc: "Modern hotel with beach view",
          rating: 4.1,
          price: 2700,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7774443333"
        }
      ],
      luxury: [
        {
          name: "Sea View Resort",
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
          desc: "Luxury resort with ocean view rooms",
          rating: 4.7,
          price: 6000,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6665554444"
        },
        {
          name: "Grand Goa Resort",
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
          desc: "Premium 5 star beach resort",
          rating: 4.8,
          price: 7500,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6662221111"
        }
      ]
    },
    Manali: {
      budget: [
        {
          name: "Snow Valley Budget Inn",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
          desc: "Affordable stay near Mall Road",
          rating: 3.7,
          price: 950,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8883334444"
        },
        {
          name: "Himalayan Budget Lodge",
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          desc: "Budget stay with mountain view",
          rating: 3.6,
          price: 900,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8885556666"
        }
      ],
      standard: [
        {
          name: "Manali Comfort Hotel",
          image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
          desc: "Comfortable stay near Solang Valley",
          rating: 4.2,
          price: 2600,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7773332222"
        },
        {
          name: "Mountain View Resort",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          desc: "Modern rooms with mountain views",
          rating: 4.1,
          price: 2800,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7775554444"
        }
      ],
      luxury: [
        {
          name: "Manali Grand Resort",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
          desc: "Luxury resort in Himalayan valley",
          rating: 4.8,
          price: 7000,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6664443333"
        },
        {
          name: "Snow Palace Resort",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          desc: "Premium resort with snow view",
          rating: 4.7,
          price: 7500,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6667778888"
        }
      ]
    },
    Kerala: {
      budget: [
        {
          name: "Backwater Budget Inn",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
          desc: "Affordable stay near Alleppey backwaters",
          rating: 3.7,
          price: 1100,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8884443333"
        },
        {
          name: "Kerala Budget Stay",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          desc: "Budget hotel near houseboat dock",
          rating: 3.6,
          price: 1000,
          timing: "Check-in 1PM | Check-out 11AM",
          contact: "91-8882224444"
        }
      ],
      standard: [
        {
          name: "Kerala Palm Resort",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          desc: "Comfortable resort with lake view",
          rating: 4.2,
          price: 2800,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7772221111"
        },
        {
          name: "Coconut Grove Hotel",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
          desc: "Modern rooms with tropical garden",
          rating: 4.1,
          price: 2600,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7778889999"
        }
      ],
      luxury: [
        {
          name: "Kerala Lake Palace",
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
          desc: "Luxury resort on the backwaters",
          rating: 4.8,
          price: 6500,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6661112222"
        },
        {
          name: "Royal Backwater Resort",
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
          desc: "Premium resort with houseboats",
          rating: 4.7,
          price: 7200,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6669990000"
        }
      ]
    },
    Ooty: {
      budget: [
        {
          name: "Ooty Hill Stay",
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          desc: "Budget hotel with mountain view",
          rating: 3.7,
          price: 900,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8881112222"
        },
        {
          name: "Green Valley Lodge",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
          desc: "Affordable lodge near Ooty lake",
          rating: 3.6,
          price: 850,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8883334444"
        }
      ],
      standard: [
        {
          name: "Ooty Garden Hotel",
          image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
          desc: "Comfortable stay near botanical garden",
          rating: 4.1,
          price: 2200,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7778889999"
        },
        {
          name: "Blue Hills Resort",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
          desc: "Modern rooms with hill view",
          rating: 4.0,
          price: 2400,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7774445555"
        }
      ],
      luxury: [
        {
          name: "Ooty Luxury Resort",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          desc: "Luxury hill resort with spa",
          rating: 4.6,
          price: 5500,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6667778888"
        },
        {
          name: "Royal Mountain Resort",
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
          desc: "Premium resort with valley view",
          rating: 4.7,
          price: 6200,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6669990000"
        }
      ]
    },
    Jaipur: {
      budget: [
        {
          name: "Pink City Budget Inn",
          image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
          desc: "Affordable stay near Hawa Mahal",
          rating: 3.7,
          price: 900,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8887772222"
        },
        {
          name: "Heritage Budget Lodge",
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          desc: "Budget stay near City Palace",
          rating: 3.6,
          price: 850,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8885551111"
        }
      ],
      standard: [
        {
          name: "Jaipur Comfort Hotel",
          image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
          desc: "Comfortable stay with heritage design",
          rating: 4.1,
          price: 2300,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7776664444"
        },
        {
          name: "Royal Pink Resort",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
          desc: "Modern hotel with city view",
          rating: 4.2,
          price: 2500,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7775553333"
        }
      ],
      luxury: [
        {
          name: "Jaipur Palace Resort",
          image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
          desc: "Luxury palace style resort",
          rating: 4.8,
          price: 6500,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6664447777"
        },
        {
          name: "Royal Heritage Palace",
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
          desc: "Premium royal palace stay",
          rating: 4.9,
          price: 7200,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6668889999"
        }
      ]
    },
    Andaman: {
      budget: [
        {
          name: "Island Budget Stay",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
          desc: "Affordable stay near beach",
          rating: 3.7,
          price: 1100,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8882224444"
        },
        {
          name: "Coral Budget Inn",
          image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
          desc: "Budget stay with sea breeze",
          rating: 3.6,
          price: 1050,
          timing: "Check-in 12PM | Check-out 11AM",
          contact: "91-8883335555"
        }
      ],
      standard: [
        {
          name: "Andaman Sea Resort",
          image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
          desc: "Comfortable stay near coral beach",
          rating: 4.2,
          price: 2800,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7771113333"
        },
        {
          name: "Ocean Breeze Hotel",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          desc: "Modern sea view rooms",
          rating: 4.1,
          price: 3000,
          timing: "Check-in 1PM | Check-out 12PM",
          contact: "91-7772224444"
        }
      ],
      luxury: [
        {
          name: "Andaman Luxury Resort",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          desc: "Luxury beachside resort",
          rating: 4.8,
          price: 7000,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6663335555"
        },
        {
          name: "Coral Island Palace",
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
          desc: "Premium island resort",
          rating: 4.7,
          price: 7500,
          timing: "Check-in 2PM | Check-out 12PM",
          contact: "91-6667779999"
        }
      ]
    }
  };

  const destinations = {
    Goa: {
      weather: "Warm sunny beach weather",
      places: [
        { name: "Baga Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
        { name: "Fort Aguada", image: "https://images.unsplash.com/photo-1587922546307-776227941871" },
        { name: "Dudhsagar Falls", image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450" }
      ]
    },
    Ooty: {
      weather: "Cool pleasant hill climate",
      places: [
        { name: "Ooty Lake", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5" },
        { name: "Botanical Garden", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
        { name: "Doddabetta Peak", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" }
      ]
    },
    Kerala: {
      weather: "Tropical climate with backwaters",
      places: [
        { name: "Alleppey Backwaters", image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e" },
        { name: "Munnar Tea Gardens", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
        { name: "Varkala Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" }
      ]
    },
    Manali: {
      weather: "Cold mountain climate",
      places: [
        { name: "Solang Valley", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b" },
        { name: "Rohtang Pass", image: "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16" },
        { name: "Hadimba Temple", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220" }
      ]
    },
    Jaipur: {
      weather: "Hot desert climate",
      places: [
        { name: "Hawa Mahal", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41" },
        { name: "Amber Fort", image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33" },
        { name: "City Palace", image: "https://images.unsplash.com/photo-1595815771614-ade501f918c8" }
      ]
    },
    Andaman: {
      weather: "Tropical island climate",
      places: [
        { name: "Radhanagar Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
        { name: "Cellular Jail", image: "https://images.unsplash.com/photo-1583244532610-2c9c8c1e5c2d" },
        { name: "Ross Island", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" }
      ]
    }
  };

  const destinationData = destinations[to] || { weather: "Weather information unavailable", places: [] };
  const tripPlaces = destinationData.places || [];

  const itineraryDays = Array.from({ length: totalDays }, (_, index) => {
    const day = index + 1;
    const focusPlace = tripPlaces[(index - 1 + tripPlaces.length) % (tripPlaces.length || 1)];

    if (day === 1) {
      return {
        title: "Arrival and check-in",
        desc: `Travel from ${from} to ${to}, settle into your stay, and ease into the local vibe.`,
        note: displayTripOption
      };
    }

    if (day === totalDays) {
      return {
        title: "Wrap up and return",
        desc: `Enjoy a relaxed final half-day, pick up souvenirs, and prepare for the return journey.`,
        note: "Departure"
      };
    }

    return {
      title: focusPlace ? `Explore ${focusPlace.name}` : `Day ${day} exploration`,
      desc: focusPlace
        ? `Spend the day around ${focusPlace.name}, local food spots, and nearby experiences in ${to}.`
        : `Enjoy a flexible day discovering more of ${to}.`,
      note: displayTripType
    };
  });

  return (
    <div className="trip-container">
      <BackButton />

      <section className="trip-hero">
        <div className="trip-hero-copy">
          <p className="trip-kicker">Planned Journey</p>
          <h1 className="trip-title">Trip from {from} to {to}</h1>
          <p className="trip-date">
            {displayStartDate} to {displayEndDate} | {totalDays} {totalDays === 1 ? "Day" : "Days"}
          </p>

          <div className="trip-overview-badges">
            <span>{displayTripOption}</span>
            <span>{displayTripType}</span>
            <span>{Math.max(totalDays - 1, 0)} Nights</span>
          </div>
        </div>

        <div className="trip-hero-panel">
          <div className="trip-hero-stat">
            <strong>{destinationData.weather}</strong>
            <span>Expected destination weather</span>
          </div>

          <div className="trip-hero-stat">
            <strong>{tripPlaces.length || 3} key spots</strong>
            <span>Highlights added to your itinerary</span>
          </div>
        </div>
      </section>

      <section className="hotel-section">
        <h2>
          <HiOutlineBuildingOffice2 />
          Your Stay
        </h2>

        {["budget", "standard", "luxury"].map((hotelType) => (
          <div key={hotelType}>
            <h3 className="hotel-heading">{hotelType.toUpperCase()} HOTEL</h3>

            <div className="hotel-row">
              {hotels[to]?.[hotelType]?.map((hotel, index) => (
                <div className="hotel-card" key={index}>
                  <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                  <h4>{hotel.name}</h4>
                  <p>{hotel.desc}</p>
                  <p>Rating: {hotel.rating}</p>
                  <p><strong>Estimated Cost:</strong> {getPriceRange(hotel.price)} / night</p>
                  <p>{hotel.timing}</p>
                  <p>Contact: {hotel.contact}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="transport-section">
        <h2 className="transport-title">
          <HiOutlinePaperAirplane />
          Transport Options
        </h2>

        <div className="transport-grid">
          <div className="transport-card">
            <div className="transport-icon">
              <HiOutlinePaperAirplane />
            </div>
            <h3>Flight</h3>
            <p>Fastest travel option from {from} to {to}.</p>
            <p className="cost">Estimated Cost: {getPriceRange(flightCost)}</p>
          </div>

          <div className="transport-card">
            <div className="transport-icon">
              <LuTrainFront />
            </div>
            <h3>Train</h3>
            <p>Comfortable railway journey with scenic routes.</p>
            <p className="cost">Estimated Cost: {getPriceRange(trainCost)}</p>
          </div>

          <div className="transport-card">
            <div className="transport-icon">
              <LuBus />
            </div>
            <h3>Bus</h3>
            <p>Budget friendly travel with frequent services.</p>
            <p className="cost">Estimated Cost: {getPriceRange(busCost)}</p>
          </div>
        </div>
      </section>

      <section className="weather-section">
        <h2 className="weather-title">
          <HiOutlineCloud />
          Weather Forecast
        </h2>

        <div className="weather-card">
          <div className="weather-info">
            <div className="weather-icon">
              <HiOutlineCloud />
            </div>
            <p className="weather-condition">{destinationData.weather}</p>
          </div>
        </div>
      </section>

      <section className="emergency-section">
        <div className="emergency-card">
          <h2 className="emergency-title">
            <HiOutlineExclamationTriangle />
            Emergency Contacts
          </h2>
          <p>Police: <span>100</span></p>
          <p>Ambulance: <span>102</span></p>
          <p>Fire: <span>101</span></p>
          <p>Tourist Helpline: <span>1800-11-1363</span></p>
          <p>General Hospital: <span>0863-222-2222</span></p>
        </div>
      </section>

      <section className="places-section">
        <h2>
          <HiOutlineMapPin />
          Suggested Places to Visit
        </h2>

        <div className="places-grid">
          {tripPlaces.map((place, index) => (
            <div className="place-card" key={index}>
              <img src={place.image} alt={place.name} className="place-image" />
              <p>{place.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="itinerary-section">
        <h2>
          <HiOutlineSparkles />
          Trip Schedule
        </h2>

        <div className="itinerary-list">
          {itineraryDays.map((item, index) => (
            <div key={index} className="itinerary-card">
              <span className="itinerary-day-tag">Day {index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <small>
                <HiOutlineBolt />
                {item.note}
              </small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TripDetails;
