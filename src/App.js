import React, { useState } from 'react';
import './App.css';
import { menuItems } from './data/menu';
import { settings } from './config/settings';
import Header from './components/Header';
import MenuGrid from './components/MenuGrid';
import Cart from './components/Cart';
import PaymentVerification from './components/PaymentVerification';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    // Generate order number
    const newOrderNumber = 'ORD-' + Date.now().toString().slice(-6);
    setOrderNumber(newOrderNumber);
    setIsCartOpen(false);
    setShowPayment(true);
  };

  const handlePaymentVerified = (paymentData) => {
    setCustomerInfo(paymentData);
    setShowPayment(false);
    setOrderConfirmed(true);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setOrderNumber(null);
  };

  const handleNewOrder = () => {
    setCart([]);
    setOrderConfirmed(false);
    setOrderNumber(null);
    setShowPayment(false);
    setCustomerInfo(null);
  };

  const handlePhoneOrder = () => {
    const orderDetails = cart.map(item => `${item.quantity}x ${item.name}`).join('%0A');
    const total = calculateTotal();
    const message = `New Order ${orderNumber}%0A%0A${orderDetails}%0A%0ATotal: ${total}k`;
    
    window.location.href = `https://wa.me/${settings.whatsappNumber}?text=${message}`;
  };

  const handleLogoClick = () => {
    setCart([]);
    setOrderConfirmed(false);
    setOrderNumber(null);
    setShowPayment(false);
    setCustomerInfo(null);
    setIsCartOpen(false);
  };

  return (
    <div className="App">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={handleLogoClick}
      />
      
      {showPayment ? (
        <PaymentVerification 
          orderNumber={orderNumber}
          cart={cart}
          total={calculateTotal()}
          onPaymentVerified={handlePaymentVerified}
          onCancel={handlePaymentCancel}
        />
      ) : orderConfirmed ? (
        <OrderConfirmation 
          orderNumber={orderNumber}
          cart={cart}
          total={calculateTotal()}
          customerInfo={customerInfo}
          onNewOrder={handleNewOrder}
          onPhoneOrder={handlePhoneOrder}
        />
      ) : (
        <>
          <MenuGrid items={menuItems} onAddToCart={addToCart} />
          {isCartOpen && (
            <Cart 
              cart={cart}
              total={calculateTotal()}
              onClose={() => setIsCartOpen(false)}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;

