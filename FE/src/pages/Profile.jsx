import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    api.get('/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data.data))
      .catch(err => console.error(err));
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <section className="page-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Hồ sơ cá nhân</h1>
        <button onClick={handleLogout} className="button button-secondary">Đăng xuất</button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
        <p><strong>Họ và tên:</strong> {user.full_name}</p>
        <p><strong>Tên đăng nhập:</strong> {user.username}</p>
        <p><strong>Số điện thoại:</strong> {user.phone || 'Chưa cập nhật'}</p>
      </div>

      <h2 style={{ marginTop: '40px' }}>Lịch sử đặt món</h2>
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn đặt món nào.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '10px', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <strong>Đơn hàng #{order.id}</strong>
                <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{order.status}</span>
              </div>
              <p style={{ margin: '5px 0' }}>Thời gian: {new Date(order.created_at).toLocaleString('vi-VN')}</p>
              <ul style={{ paddingLeft: '20px', margin: '10px 0' }}>
                {order.items?.map(item => (
                  <li key={item.id} style={{ margin: '5px 0' }}>
                    {item.name} x {item.quantity} - {Number(item.price * item.quantity).toLocaleString('vi-VN')} VNĐ
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem', color: '#dc2626' }}>
                Tổng cộng: {Number(order.total_price).toLocaleString('vi-VN')} VNĐ
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Profile;
