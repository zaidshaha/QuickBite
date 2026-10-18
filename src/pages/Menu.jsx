import { useState } from "react";
import FoodCard from "../Components/FoodCard.jsx";
import { menuItems, categories } from "../data/menu.js";

export default function Menu({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section page-section">
      <span className="eyebrow">WHAT ARE YOU CRAVING?</span>
      <h1 className="page-title">Our Menu</h1>
      <p className="muted">Find your next campus favourite.</p>

      <input
        className="search-input"
        type="search"
        placeholder="Search snacks, drinks, meals..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

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
            {category}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="food-grid">
          {filteredItems.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>🔎</span>
          <h2>No food found</h2>
          <p>Try another search or select a different category.</p>
        </div>
      )}
    </section>
  );
}