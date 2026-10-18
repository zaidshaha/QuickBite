import { Link } from "react-router-dom";
import { menuItems } from "../data/menu.js";
import FoodCard from "../Components/FoodCard.jsx";

export default function Home({ addToCart }) {
  const popularItems = menuItems.filter((item) => item.popular);

  return (
    <>
        <span className="eyebrow">WELCOME TO PCCOE CANTEENS</span>
        <h1>Your campus food, One Click away.</h1>
        <p>
  From a quick chai to a filling ₹75 thali,
  
    </p>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR CAMPUS FOOD SPOT</span>
          <h1>Hungry between classes?</h1>
          <p>
            Your favourite snacks, meals and drinks are just a few
            clicks away.
          </p>
          <Link to="/menu" className="primary-button">
            Explore Menu →
          </Link>

          <div className="hero-stats">
            <span>⚡ Quick ordering</span>
            <span>🍟 Student favourites</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Food illustration">
          <span>🍔</span>
          <span>🍟</span>
          <span>🥤</span>
          <div className="hero-circle">Yummy<br />Every day!</div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">STUDENT FAVOURITES</span>
            <h2>Popular right now</h2>
          </div>
          <Link to="/menu" className="text-link">View all →</Link>
        </div>

        <div className="food-grid">
          {popularItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <div>
          <span className="eyebrow">YOUR BREAK, YOUR WAY</span>
          <h2>Good food. Good mood.</h2>
          <p>Find something tasty for your next college break.</p>
        </div>
        <Link to="/menu" className="primary-button">
          Order Now →
        </Link>
      </section>
    </>
  );
}