import React from 'react';
import './MenuCard.css';

const MenuCard = ({ item, onAddToCart }) => {
  return (
    <div className="menu-card">
      <div className="menu-card-image">
        {item.image.startsWith('/') ? (
          <img src={item.image} alt={item.name} className="default-image" />
        ) : (
          <span className="emoji-large">{item.image}</span>
        )}
        <span className="price-badge">{item.price}k</span>
      </div>
      <div className="menu-card-content">
        <h3>{item.name}</h3>
        {item.benefits && (
          <p className="menu-card-benefits">{item.benefits}</p>
        )}
        {!item.benefits && (
          <p className="menu-card-description">{item.description}</p>
        )}
        {item.ingredients && (
          <div className="menu-card-ingredients">
            {item.ingredients.map((ingredient, idx) => (
              <span key={idx} className="ingredient-tag">{ingredient}</span>
            ))}
          </div>
        )}
        <div className="menu-card-footer">
          <button className="add-to-cart-btn" onClick={() => onAddToCart(item)}>
            Chọn món
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;

