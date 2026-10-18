import { Link, NavLink } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">🍴</span>
        QuickBite
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart" className="cart-link">
          Cart <span className="cart-count">{cartCount}</span>
        </NavLink>
      </nav>
    </header>
  );
}