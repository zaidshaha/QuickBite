
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { menuItems, categories } from "../data/menu.js";
import FoodCard from "../Components/FoodCard.jsx";

export default function Home({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleItems = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? menuItems
        : menuItems.filter(
            (item) => item.category === activeCategory
          );

    return filtered;
  }, [activeCategory]);

  return (
    <main>
      <section className="hero">
        <img
          className="hero-background"
          src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=2000&q=90"
          alt="Indian thali meal"
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="eyebrow">
            WELCOME TO PCCOE CANTEENS
          </span>

          <h1>
            Good food.
            <br />
            Great breaks.
            <br />
            <span>QuickBite.</span>
          </h1>

          <p>
            From a quick chai to a filling ₹75 thali,
            discover your campus favourites in one place.
          </p>

          <Link to="/menu" className="primary-button">
            Explore Menu <span>→</span>
          </Link>

          <div className="hero-perks">
            <span>✦ Fresh & tasty</span>
            <span>♡ Student friendly</span>
            <span>✓ Easy ordering</span>
          </div>
        </div>

        <div className="hero-note">
          <span>MADE FOR YOUR</span>
          <strong>Campus cravings.</strong>
        </div>
      </section>

      <section className="menu-section" id="popular">
        <div className="section-heading">
          <div>
            <span className="section-kicker">YOUR CAMPUS FAVOURITES</span>
            <h2>Something delicious awaits.</h2>
            <p>Good food, great prices, right around campus.</p>
          </div>

          <Link to="/menu" className="text-link">
            View full menu →
          </Link>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category === "All" && "✦ "}
              {category === "Snacks" && "🥪 "}
              {category === "Meals" && "🍛 "}
              {category === "Drinks" && "🥤 "}
              {category === "Desserts" && "🍰 "}
              {category}
            </button>
          ))}
        </div>

        <div className="food-grid">
          {visibleItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <section className="campus-banner">
        <div>
          <span className="section-kicker">YOUR BREAK. YOUR BITE.</span>
          <h2>Hungry between classes?</h2>
          <p>
            Find your favourite snacks and meals at PCCOE Canteens.
          </p>
        </div>

        <Link to="/menu" className="primary-button">
          Find your food →
        </Link>
      </section>
    </main>
  );
}
