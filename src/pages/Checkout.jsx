import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout({ cart, cartTotal, placeOrder }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  if (cart.length === 0) {
    return (
      <section className="empty-state page-section">
        <span>🛍️</span>
        <h1>Nothing to check out</h1>
        <p>Add items to your cart before placing an order.</p>
        <Link to="/menu" className="primary-button">
          Go to Menu
        </Link>
      </section>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const orderId = placeOrder({ name, phone, location });
    navigate("/orders", { state: { newOrderId: orderId } });
  }

  return (
    <section className="section page-section">
      <span className="eyebrow">ONE LAST STEP</span>
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Your Details</h2>

          <label htmlFor="customer-name">Full name</label>
          <input
            id="customer-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="customer-phone">Phone number</label>
          <input
            id="customer-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
            required
          />

          <label htmlFor="customer-location">College / PG location</label>
          <textarea
            id="customer-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter your delivery location"
            rows={3}
            required
          />

          <label htmlFor="payment-method">Payment method</label>
          <select
            id="payment-method"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          >
            <option value="">Select a demo payment method</option>
            <option value="Cash on delivery">Cash on delivery</option>
            <option value="UPI on delivery">UPI on delivery</option>
          </select>

          <button type="submit" className="primary-button full-button">
            Place Demo Order · ₹{cartTotal}
          </button>

          <p className="form-note">
            This is a demo checkout. No payment will be processed.
          </p>
        </form>

        <aside className="summary-card">
          <h2>Your Order</h2>
          {cart.map((item) => (
            <div className="summary-line" key={item.id}>
              <span>{item.emoji} {item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr />
          <div className="summary-line total-line">
            <strong>Total</strong>
            <strong>₹{cartTotal}</strong>
          </div>
          <p className="muted">
            Payment selection: {message || "Not selected"}
          </p>
        </aside>
      </div>
    </section>
  );
}