# 🥤 Lolibub Juice - Online Ordering System

A beautiful and modern React-based juice ordering website for Lolibub Juice. Customers can browse the menu, add items to cart, place orders, and receive order details via phone.

## Features

- 🎨 Modern, responsive UI design with hero images
- 🛒 Interactive shopping cart
- 📋 Vietnamese menu with local juice options
- 📞 WhatsApp integration for sending orders
- 🎫 Automatic order number generation
- 💰 Real-time total calculation
- 📱 Mobile-friendly design
- 🌈 Beautiful gradient themes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure phone number in `src/config/settings.js`:
   - Update `phoneNumber` with your actual phone number (format: +1234567890)
   - Update `whatsappNumber` with your WhatsApp number (format: 1234567890)
   - Optionally customize `storeName` and `storeSlogan`

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Browse Menu**: View all available juices with descriptions and prices
2. **Add to Cart**: Click "Add to Cart" on any juice item
3. **Review Order**: Click the cart icon to review your items
4. **Place Order**: Click "Place Order" to create your order
5. **Get Order Number**: Receive a unique order number (e.g., ORD-123456)
6. **Send via Phone**: Click "Send Order via Phone" to send order details

## Project Structure

```
lolibub-juice/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── MenuGrid.js
│   │   ├── MenuCard.js
│   │   ├── Cart.js
│   │   └── OrderConfirmation.js
│   ├── data/
│   │   └── menu.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Customization

### Adding More Juices

Edit `src/data/menu.js` to add, remove, or modify juice items:

```javascript
{
  id: 13,
  name: "New Juice",
  description: "Description here",
  price: 6.99,
  category: "Category",
  image: "🥤"
}
```

### Styling

- Global styles: `src/index.css`
- Component styles: `src/components/*.css`
- Main app styles: `src/App.css`

## Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Technologies

- React 18
- CSS3 with modern gradients
- Mobile-responsive design
- WhatsApp integration

## License

© 2024 Lolibub Juice

