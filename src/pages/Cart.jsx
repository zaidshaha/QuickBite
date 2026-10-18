import { Link } from "react-router-dom";

export default function Cart({
  cart,
  cartTotal,
  changeQuantity,
  removeFromCart,
}) {
  if (cart.length === 0) {
    return (
      <section className="empty-state page-section">
        <span>🛒</span>
        <h1>Your cart is empty</h1>
        <p>Add something tasty from the menu.</p>
        <Link to="/menu" className="primary-button">
          Explore Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="section page-section">
      <span className="eyebrow">ALMOST THERE</span>
      <h1 className="page-title">Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-emoji">{item.emoji}</div>

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} each</p>

                <div className="quantity-control">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => changeQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => changeQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-end">
                <strong>₹{item.price * item.quantity}</strong>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="summary-card">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Items</span>
            <span>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className="summary-line">
            <span>Delivery</span>
            <span>₹0</span>
          </div>
          <hr />
          <div className="summary-line total-line">
            <strong>Total</strong>
            <strong>₹{cartTotal}</strong>
          </div>
          <Link to="/checkout" className="primary-button full-button">
            Proceed to Checkout →
          </Link>
        </aside>
      </div>
    </section>
  );
}