
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">🍴</span>
            <span>
              <strong>Quick<span>Bite</span></strong>
              <small>Your campus cravings, sorted.</small>
            </span>
          </Link>
          <p className="footer-location">📍 PCCOE Canteens</p>
        </div>

        <div className="footer-column">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/orders">My Orders</Link>
        </div>

        <div className="footer-column">
          <h4>Made for campus</h4>
          <p>Good food for your everyday breaks.</p>
          <p>Simple ordering. Student-friendly prices.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} QuickBite</span>
        <span>Made for campus cravings ♥</span>
      </div>
    </footer>
  );
}
