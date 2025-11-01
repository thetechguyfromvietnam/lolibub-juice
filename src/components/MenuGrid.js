import React from 'react';
import './MenuGrid.css';
import MenuCard from './MenuCard';
import { getMenuSections, getSectionTitle } from '../utils/menuSections';

const MenuGrid = ({ items, onAddToCart }) => {
  const sections = getMenuSections(items);
  const sectionOrder = [
    "Mix Tự Chọn",
    "Thực đơn Thứ 2",
    "Tuỳ chọn thêm"
  ];
  
  return (
    <div className="menu-container">
      <div className="hero-section">
        <div className="hero-image-container">
          <img src="/images/menu-hero.jpg" alt="Combamien văn phòng" className="hero-image" />
          <div className="hero-overlay">
            <h2>🥗 Combo Mix Chuẩn Cơm Nhà</h2>
            <p>Đổi gió bữa trưa văn phòng với thực đơn Thứ 2 của Combamien</p>
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

