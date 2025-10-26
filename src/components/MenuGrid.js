import React from 'react';
import './MenuGrid.css';
import MenuCard from './MenuCard';
import { getMenuSections, getSectionTitle } from '../utils/menuSections';

const MenuGrid = ({ items, onAddToCart }) => {
  const sections = getMenuSections(items);
  const sectionOrder = ["Nước Ép Mix", "Trà Trái Cây", "Trà Sữa", "Yogurt", "Cafe", "Toppings"];
  
  return (
    <div className="menu-container">
      <div className="hero-section">
        <div className="hero-image-container">
          <img src="/images/hero-image.jpg" alt="Fresh Juices" className="hero-image" />
          <div className="hero-overlay">
            <h2>🍹 Lolibub Juice - Fresh & Delicious!</h2>
            <p>Vietnamese drinks made with love</p>
          </div>
        </div>
      </div>
      
      {sectionOrder.map(category => sections[category] && (
        <div key={category} className="menu-section">
          <h2 className="section-title">{getSectionTitle(category)}</h2>
          <div className="menu-grid">
            {sections[category].map(item => (
              <MenuCard 
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuGrid;

