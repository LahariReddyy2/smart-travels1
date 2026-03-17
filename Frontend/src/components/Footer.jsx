import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <span className="footer-badge">Smart Travels</span>
          <h3>Designed for easier trip planning across India.</h3>
          <p>
            Create routes, review destination ideas, and keep your travel plans
            in one clean experience.
          </p>
        </div>

        <div className="footer-grid">
          <div className="footer-section">
            <h4>Explore</h4>
            <p>Home</p>
            <p>Destinations</p>
            <p>Offers</p>
            <p>Trip Planner</p>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <p>Hyderabad, India</p>
            <p>+91 9876543210</p>
            <p>support@smarttravels.com</p>
          </div>

          <div className="footer-section">
            <h4>Why Travelers Like It</h4>
            <p>Curated destinations</p>
            <p>Simple planning flow</p>
            <p>Easy trip updates</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2026 Smart Travels. Crafted for smoother travel planning.</p>
      </div>
    </footer>
  );
}

export default Footer;
