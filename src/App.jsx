
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./pages/Home.jsx";
import { menuItems } from "./data/menu.js";
import "./styles.css";

function MenuPage({ addToCart }) {
  return (
    <main className="menu-section">
      <span className="section-kicker">THE QUICKBITE MENU</span>
      <h2>All your favourites.</h2>
      <p>Choose your food and add it to your cart.</p>
      <div className="food-grid">
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Reuse the same card as the homepage */}
            <MenuCard item={item} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </main>
  );
}

function MenuCard({ item, addToCart }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="food-card">
      <div className="food-image">
        {!failed && item.image ? (
          <img
            src={item.image}
            alt={item.name}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="food-fallback">🍽️</div>
        )}
      </div>
      <div className="food-info">
        <span className="food-category">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="food-bottom">
          <strong>₹{item.price}</strong>
          <button onClick={() => addToCart(item)}>+ Add</button>
        </div>
      </div>
    </article>
  );
}

function CartPage({ cart, changeQuantity, removeItem }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="simple-page">
      <span className="section-kicker">YOUR ORDER</span>
      <h1>Your cart 🛒</h1>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty. Let's find something delicious.</p>
          <Link className="primary-button" to="/menu">
            Explore Menu →
          </Link>
        </>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price} each</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => changeQuantity(item.id, -1)}>
                  −
                </button>
                <strong>{item.quantity}</strong>
                <button onClick={() => changeQuantity(item.id, 1)}>
                  +
                </button>
                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
          <p className="demo-note">
            Demo website: no real payment will be collected.
          </p>
        </>
      )}
    </main>
  );
}

function OrdersPage() {
  return (
    <main className="simple-page">
      <span className="section-kicker">QUICKBITE</span>
      <h1>My Orders</h1>
      <p>
        This demo currently saves your cart, but does not submit
        real orders to a canteen.
      </p>
      <Link to="/menu" className="primary-button">
        Browse Menu →
      </Link>
    </main>
  );
}

function AppContent() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quickbite-cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("quickbite-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);

      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/menu" element={<MenuPage addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
            />
          }
        />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<Home addToCart={addToCart} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
