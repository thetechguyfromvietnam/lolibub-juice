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
    "Mix Tự Chọn": "🥗 Mix Tự Chọn",
    "Thực đơn Thứ 2": "🍽️ Thực đơn Thứ 2",
    "Tuỳ chọn thêm": "➕ Tuỳ chọn thêm"
  };
  
  return titles[category] || category;
};

