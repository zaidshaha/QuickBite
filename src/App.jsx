import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cart, setCart] = useState(() =>
    readStorage("quickbite-cart", [])
  );

  const [orders, setOrders] = useState(() =>
    readStorage("quickbite-orders", [])
  );

  useEffect(() => {
    localStorage.setItem("quickbite-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("quickbite-orders", JSON.stringify(orders));
  }, [orders]);

  function addToCart(item) {
    setCart((current) => {
      const existing = current.find((product) => product.id === item.id);

      if (existing) {
        return current.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function placeOrder(customer) {
    const newOrder = {
      id: Date.now(),
      customer,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      date: new Date().toLocaleString(),
      status: "Order placed",
    };

    setOrders((current) => [newOrder, ...current]);
    setCart([]);
    return newOrder.id;
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <Navbar cartCount={cartCount} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home addToCart={addToCart} />}
          />

          <Route
            path="/menu"
            element={<Menu addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                cartTotal={cartTotal}
                changeQuantity={changeQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                cartTotal={cartTotal}
                placeOrder={placeOrder}
              />
            }
          />

          <Route
            path="/orders"
            element={<Orders orders={orders} />}
          />

          <Route
            path="*"
            element={
              <section className="empty-state">
                <h2>Page not found</h2>
                <a className="primary-button" href="/">
                  Back to Home
                </a>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}