import { useEffect, useState } from 'react';
import api from '../services/api';

const restaurantsData = [
  {
    id: 1,
    name: 'Hotpot Story - Hà Nội',
    address: 'Số 1, Phố Nhà Thờ, Hoàn Kiếm, Hà Nội',
    open: '10:00',
    close: '22:00',
    phone: '+84 24 3799 0000',
  },
  {
    id: 2,
    name: 'Manwah - TP.HCM',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    open: '11:00',
    close: '23:00',
    phone: '+84 28 3911 1100',
  },
];

const Booking = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurantsData[0]);
  const [formValues, setFormValues] = useState({
    restaurant_id: selectedRestaurant.id,
    date: '',
    time: '',
    guest_count: 2,
    name: '',
    phone: '',
    email: '',
    note: '',
    agree_policy: false,
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, restaurant_id: selectedRestaurant.id }));
  }, [selectedRestaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Đang gửi yêu cầu...' });

    try {
      await api.post('/bookings', formValues);
      setStatus({ type: 'success', message: 'Đặt bàn thành công! Chúng tôi sẽ liên hệ lại sớm.' });
      setFormValues((prev) => ({ ...prev, date: '', time: '', guest_count: 2, name: '', phone: '', email: '', note: '', agree_policy: false }));
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Không thể đặt bàn, vui lòng thử lại.' });
    }
  };

  return (
    <section className="page-section booking-section">
      <div className="page-header">
        <h1>Đặt bàn</h1>
      </div>
      <div className="booking-layout">
        <aside className="booking-sidebar">
          <h2>Chi nhánh nhà hàng</h2>
          <div className="restaurant-list">
            {restaurantsData.map((restaurant) => (
              <div
                key={restaurant.id}
                className={`restaurant-card ${selectedRestaurant.id === restaurant.id ? 'active' : ''}`}
                onClick={() => setSelectedRestaurant(restaurant)}
              >
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
                <p>Giờ mở cửa: {restaurant.open} - {restaurant.close}</p>
                <div className="actions">
                  <a href={`tel:${restaurant.phone}`} className="button button-secondary">Gọi nhà hàng</a>
                  <button type="button" className="button button-primary">Đặt bàn</button>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div className="booking-panel">
          <div className="restaurant-detail">
            <h2>{selectedRestaurant.name}</h2>
            <p>{selectedRestaurant.address}</p>
            <p>Giờ mở cửa: {selectedRestaurant.open} - {selectedRestaurant.close}</p>
            <p>Hotline: {selectedRestaurant.phone}</p>
          </div>
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Ngày đặt
                <input type="date" name="date" value={formValues.date} onChange={handleChange} required />
              </label>
              <label>
                Giờ đặt
                <input type="time" name="time" value={formValues.time} onChange={handleChange} required />
              </label>
              <label>
                Số lượng khách
                <input type="number" name="guest_count" min="1" value={formValues.guest_count} onChange={handleChange} required />
              </label>
              <label>
                Họ tên
                <input type="text" name="name" value={formValues.name} onChange={handleChange} required />
              </label>
              <label>
                Số điện thoại
                <input type="tel" name="phone" value={formValues.phone} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={formValues.email} onChange={handleChange} required />
              </label>
            </div>
            <label className="full-width">
              Ghi chú
              <textarea name="note" value={formValues.note} onChange={handleChange} rows="4" />
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="agree_policy" checked={formValues.agree_policy} onChange={handleChange} />
              Tôi đồng ý với chính sách và điều khoản của nhà hàng.
            </label>
            <div className="form-actions">
              <button type="button" className="button button-secondary" onClick={() => setFormValues({ ...formValues, date: '', time: '', guest_count: 2, name: '', phone: '', email: '', note: '', agree_policy: false })}>
                Hủy bỏ
              </button>
              <button type="submit" className="button button-primary">Xác nhận</button>
            </div>
            {status && <div className={`message ${status.type}`}>{status.message}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;
