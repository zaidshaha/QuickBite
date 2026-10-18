
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">🍴</span>
        <span>
          <strong>Quick<span>Bite</span></strong>
          <small>Your campus cravings, sorted.</small>
        </span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/cart">
          Cart <span className="cart-count">{cartCount}</span>
        </NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>

      <div className="campus-pill">
        <span>📍</span> PCCOE Canteens
      </div>
    </header>
  );
}
