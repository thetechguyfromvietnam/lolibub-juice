export const getMenuSections = (items) => {
  const sections = {};
  
  items.forEach(item => {
    if (!sections[item.category]) {
      sections[item.category] = [];
    }
    sections[item.category].push(item);
  });
  
  return sections;
};

export const getSectionTitle = (category) => {
  const titles = {
    "Nước Ép Mix": "🍹 Nước Ép Mix (39k)",
    "Trà Trái Cây": "🧋 Trà Trái Cây (35k)",
    "Trà Sữa": "🥤 Trà Sữa",
    "Yogurt": "🍓 Yogurt",
    "Cafe": "☕ Cafe",
    "Toppings": "⭐ Extra Toppings (+10k)"
  };
  
  return titles[category] || category;
};

