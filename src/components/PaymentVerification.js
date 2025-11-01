import React, { useMemo, useState } from 'react';
import './PaymentVerification.css';
import { getSectionTitle } from '../utils/menuSections';

const PaymentVerification = ({ orderNumber, cart, total, onPaymentVerified, onCancel }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [deliveryWindow, setDeliveryWindow] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [notes, setNotes] = useState('');

  const groupedItems = useMemo(() => {
    return cart.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [cart]);

  const handleSubmit = () => {
    if (!customerName || !customerPhone || !customerAddress || !eventDate) {
      alert('Vui lòng nhập đầy đủ họ tên, số điện thoại, địa chỉ giao và ngày giao trước khi xác nhận.');
      return;
    }

    onPaymentVerified({
      orderNumber,
      customerName,
      customerPhone,
      customerAddress,
      eventDate,
      deliveryWindow,
      peopleCount,
      notes,
      cart,
      total
    });
  };

  return (
    <div className="payment-verification">
      <div className="payment-content">
        <div className="payment-header">
          <div className="success-icon">🥗</div>
          <h1>Xác nhận đơn Combamien</h1>
          <div className="order-number">
            <p>Mã đơn hàng</p>
            <h2>{orderNumber}</h2>
          </div>
        </div>

        <div className="booking-summary">
          {cart.length === 0 ? (
            <p className="summary-empty">Chưa có món nào. Vui lòng quay lại menu để chọn món.</p>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="summary-category">
                <h3>{getSectionTitle(category)}</h3>
                <ul className="summary-list">
                  {items.map(item => (
                    <li key={item.id}>
                      <span>{item.quantity}× {item.name}</span>
                      <span>{item.price * item.quantity}k</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}

          <div className="summary-total">
            <span>Tổng tạm tính</span>
            <span>{total}k</span>
          </div>
        </div>

        <div className="customer-form">
          <h3>Thông tin nhận đơn</h3>
          <div className="form-group">
            <label>Họ và tên *</label>
            <input 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nhập tên của bạn"
              required
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại *</label>
            <input 
              type="tel" 
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="0768130139"
              required
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ giao hàng *</label>
            <input 
              type="text" 
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Nhập địa chỉ nhận hàng"
              required
            />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Ngày giao *</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Khung giờ mong muốn</label>
              <input
                type="text"
                value={deliveryWindow}
                onChange={(e) => setDeliveryWindow(e.target.value)}
                placeholder="Ví dụ: 11:30 - 12:00"
              />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Số phần ăn</label>
              <input
                type="number"
                min="1"
                value={peopleCount}
                onChange={(e) => setPeopleCount(e.target.value)}
                placeholder="Bao nhiêu phần ăn?"
              />
            </div>
            <div className="form-group">
              <label>Ghi chú thêm</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ví dụ: ít cay, thêm nước chấm..."
              />
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-submit" onClick={handleSubmit}>
            ✅ Gửi thông tin đặt món
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Huỷ
          </button>
        </div>
        
        <p className="info-note">
          ⚠️ Đội ngũ Combamien sẽ liên hệ xác nhận đơn và hướng dẫn thanh toán trong 15 phút.
        </p>
      </div>
    </div>
  );
};

export default PaymentVerification;

