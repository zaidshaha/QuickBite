import { Link, useLocation } from "react-router-dom";

export default function Orders({ orders }) {
  const location = useLocation();
  const newOrderId = location.state?.newOrderId;

  return (
    <section className="section page-section">
      <span className="eyebrow">YOUR QUICKBITE ACTIVITY</span>
      <h1 className="page-title">My Orders</h1>

      {newOrderId && (
        <div className="success-message">
          ✅ Your demo order has been placed successfully!
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <span>📦</span>
          <h2>No orders yet</h2>
          <p>Your placed orders will appear here.</p>
          <Link to="/menu" className="primary-button">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <small>ORDER #{String(order.id).slice(-6)}</small>
                  <h3>{order.customer.name}</h3>
                  <p>{order.date}</p>
                </div>
                <span className="order-status">{order.status}</span>
              </div>

              <div className="order-products">
                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.emoji} {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="order-footer">
                <span>Delivery: {order.customer.location}</span>
                <strong>Total: ₹{order.total}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}