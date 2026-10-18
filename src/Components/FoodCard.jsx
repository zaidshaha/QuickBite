export default function FoodCard({ item, addToCart }) {
  return (
    <article className="food-card">
      <div className="food-image">
        <span>{item.emoji}</span>
        {item.popular && <span className="popular-tag">Popular</span>}
      </div>

      <div className="food-info">
        <small>{item.category}</small>
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