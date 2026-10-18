
import { useState } from "react";

export default function FoodCard({ item, addToCart }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="food-card">
      <div className="food-image">
        {!imageFailed ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="food-fallback">🍽️</div>
        )}

        {item.popular && (
          <span className="popular-tag">★ Popular</span>
        )}
      </div>

      <div className="food-info">
        <span className="food-category">{item.category}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>

        <div className="food-bottom">
          <strong>₹{item.price}</strong>
          <button onClick={() => addToCart(item)}>
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
