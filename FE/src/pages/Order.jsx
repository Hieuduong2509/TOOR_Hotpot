import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFetchMenu } from '../hooks/useFetchMenu';
import api from '../services/api';

const Order = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { menuItems, loading, error } = useFetchMenu();

  const [step, setStep] = useState(1);
  const [selectedBroths, setSelectedBroths] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); // { item, quantity }
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/order' } } });
    }
  }, [user, navigate]);

  if (!user) return null;

  const broths = menuItems.filter(item => item.category === 'Lẩu');
  const otherItems = menuItems.filter(item => item.category !== 'Lẩu' && item.category !== 'Buffet' && item.category !== 'Set Menu');

  const handleBrothToggle = (broth) => {
    const isSelected = selectedBroths.find(b => b.id === broth.id);
    if (isSelected) {
      setSelectedBroths(selectedBroths.filter(b => b.id !== broth.id));
    } else {
      if (selectedBroths.length >= 2) {
        alert('Bạn chỉ được chọn tối đa 2 nước lẩu!');
        return;
      }
      setSelectedBroths([...selectedBroths, broth]);
    }
  };

  const handleItemQuantity = (item, delta) => {
    const existing = selectedItems.find(i => i.item.id === item.id);
    if (existing) {
      const newQuantity = existing.quantity + delta;
      if (newQuantity <= 0) {
        setSelectedItems(selectedItems.filter(i => i.item.id !== item.id));
      } else {
        setSelectedItems(selectedItems.map(i => i.item.id === item.id ? { ...i, quantity: newQuantity } : i));
      }
    } else if (delta > 0) {
      setSelectedItems([...selectedItems, { item, quantity: 1 }]);
    }
  };

  const getItemQuantity = (itemId) => {
    const found = selectedItems.find(i => i.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const calculateTotal = () => {
    const brothTotal = selectedBroths.reduce((sum, b) => sum + Number(b.price), 0);
    const itemsTotal = selectedItems.reduce((sum, i) => sum + (Number(i.item.price) * i.quantity), 0);
    return brothTotal + itemsTotal;
  };

  const handleCheckout = async () => {
    setOrderLoading(true);
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        items: [
          ...selectedBroths.map(b => ({ menu_item_id: b.id, quantity: 1, price: b.price })),
          ...selectedItems.map(i => ({ menu_item_id: i.item.id, quantity: i.quantity, price: i.item.price }))
        ]
      };
      await api.post('/orders', orderData, { headers: { Authorization: `Bearer ${token}` } });
      setOrderSuccess(true);
      setStep(4);
    } catch (err) {
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setOrderLoading(false);
    }
  };

  if (loading) return <div className="page-section">Đang tải dữ liệu...</div>;
  if (error) return <div className="page-section error">{error}</div>;

  return (
    <section className="page-section">
      <div className="breadcrumb">Trang chủ &gt; Đặt món</div>
      <h1>Đặt món trực tuyến</h1>

      {step === 1 && (
        <div>
          <h2>Bước 1: Chọn Nước Lẩu (Tối đa 2)</h2>
          <p>Bạn đã chọn: {selectedBroths.length}/2</p>
          <div className="menu-grid-new">
            {broths.map(broth => {
              const isSelected = selectedBroths.some(b => b.id === broth.id);
              return (
                <div key={broth.id} className="menu-item-box" style={{ position: 'relative', border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0', cursor: 'pointer' }} onClick={() => handleBrothToggle(broth)}>
                  <img 
                    src={`/Image/menu/${broth.image_url || 'placeholder.png'}`} 
                    alt={broth.name} 
                    className="menu-item-img"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/233x195?text=No+Image'; }}
                  />
                  <div className="menu-item-name" style={{ flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '5px' }}>{broth.name}</h3>
                    <span className="price" style={{ marginTop: '0', fontSize: '0.9rem' }}>{Number(broth.price).toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  {isSelected && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#2563eb', color: 'white', padding: '5px 10px', borderRadius: '50%' }}>✓</div>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button 
              className="button button-primary" 
              onClick={() => setStep(2)}
              disabled={selectedBroths.length === 0}
            >
              Tiếp tục chọn món ăn kèm &gt;
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Bước 2: Chọn Đồ Ăn Kèm</h2>
            <button className="button button-secondary" onClick={() => setStep(1)}>&lt; Quay lại</button>
          </div>
          {otherItems.length === 0 && <p>Chưa có đồ ăn kèm trong hệ thống.</p>}
          <div className="menu-grid-new" style={{ marginTop: '20px' }}>
            {otherItems.map(item => (
              <div key={item.id} className="menu-item-box">
                <img 
                  src={`/Image/menu/${item.image_url || 'placeholder.png'}`} 
                  alt={item.name} 
                  className="menu-item-img"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/233x195?text=No+Image'; }}
                />
                <div className="menu-item-name" style={{ flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '5px' }}>{item.name}</h3>
                  <span className="price" style={{ marginTop: '0', fontSize: '0.9rem' }}>{Number(item.price).toLocaleString('vi-VN')} VNĐ</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => handleItemQuantity(item, -1)} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 'bold' }}>{getItemQuantity(item.id)}</span>
                    <button onClick={() => handleItemQuantity(item, 1)} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button 
              className="button button-primary" 
              onClick={() => setStep(3)}
            >
              Xem giỏ hàng và Đặt món &gt;
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Bước 3: Xác nhận đơn hàng</h2>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <h3>Thông tin khách hàng</h3>
            <p><strong>Họ tên:</strong> {user.full_name}</p>
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
          </div>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <h3>Chi tiết đơn hàng</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {selectedBroths.map(b => (
                <li key={b.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                  <span>{b.name} (Nước lẩu)</span>
                  <span>{Number(b.price).toLocaleString('vi-VN')} VNĐ</span>
                </li>
              ))}
              {selectedItems.map(i => (
                <li key={i.item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                  <span>{i.item.name} x {i.quantity}</span>
                  <span>{Number(i.item.price * i.quantity).toLocaleString('vi-VN')} VNĐ</span>
                </li>
              ))}
            </ul>
            <hr style={{ margin: '20px 0', borderTop: '1px dashed #ccc' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', color: '#dc2626' }}>
              <span>Tổng thanh toán:</span>
              <span>{calculateTotal().toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="button button-secondary" onClick={() => setStep(2)}>&lt; Quay lại</button>
            <button className="button button-primary" onClick={handleCheckout} disabled={orderLoading}>
              {orderLoading ? 'Đang xử lý...' : 'Xác nhận Đặt Hàng'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <h2 style={{ color: '#0f766e', fontSize: '2rem', marginBottom: '20px' }}>🎉 Đặt hàng thành công!</h2>
          <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '30px' }}>Cảm ơn <strong>{user.full_name}</strong>. Đơn hàng của bạn đã được ghi nhận. Nhà hàng sẽ chuẩn bị món ngay lập tức.</p>
          <button className="button button-primary" onClick={() => navigate('/profile')}>Xem lịch sử đơn hàng</button>
        </div>
      )}
    </section>
  );
};

export default Order;
