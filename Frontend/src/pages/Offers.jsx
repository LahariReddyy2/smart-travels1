import "./Offers.css";

function Offers() {

  const coupons = [
    { code: "TRAVEL20", desc: "Get 20% off on your first booking" },
    { code: "FLY10", desc: "Flat 10% discount on flight bookings" },
    { code: "SUMMER25", desc: "25% off on summer vacation trips" }
  ];

  const offers = [
    {
      title: "Goa Beach Escape",
      discount: "30% OFF",
      desc: "Enjoy sunny beaches and nightlife in Goa.",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    },
    {
      title: "Manali Mountain Trip",
      discount: "25% OFF",
      desc: "Experience snow and adventure in Manali.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
    },
    {
      title: "Kerala Backwaters",
      discount: "20% OFF",
      desc: "Relax in the beautiful houseboats of Kerala.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    {
      title: "Ooty Hill Station",
      discount: "15% OFF",
      desc: "Explore tea gardens and cool climate.",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    }
  ];

  return (
    <div className="offers-page">

      <h1>Travel Offers ✈</h1>
      <p className="subtitle">Best deals for your next trip</p>

      
      <div className="coupon-section">
        <h2>Coupons</h2>

        <div className="coupon-container">
          {coupons.map((coupon, index) => (
            <div className="coupon-card" key={index}>
              <h3>{coupon.code}</h3>
              <p>{coupon.desc}</p>
              <button>Apply</button>
            </div>
          ))}
        </div>
      </div>

      
      <div className="offers-container">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <img src={offer.img} alt={offer.title} />

            <div className="offer-content">
              <h3>{offer.title}</h3>
              <p>{offer.desc}</p>
              <span className="discount">{offer.discount}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default Offers;