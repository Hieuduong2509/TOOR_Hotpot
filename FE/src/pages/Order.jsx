import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';
import { useFetchMenu } from '../hooks/useFetchMenu';
import api from '../services/api';

const staticMenuItems = [
  // Lẩu
  { id: 1, name: 'Lẩu Nấm Thiên Nhiên', price: 129000, category: 'Lẩu', image_url: '60000207-lau-nam_1_1.jpg' },
  { id: 2, name: 'Lẩu Kim Chi', price: 129000, category: 'Lẩu', image_url: '60001017-lau-kim-chi_1_1.jpg' },
  { id: 3, name: 'Lẩu Mala Đài Loan', price: 159000, category: 'Lẩu', image_url: '60001563-lau-mala-dai-loan_1_1.jpg' },
  { id: 4, name: 'Lẩu Thái Chùa Cay', price: 139000, category: 'Lẩu', image_url: '60001564-lau-thai_1_1.jpg' },
  { id: 5, name: 'Lẩu Cà Chua', price: 119000, category: 'Lẩu', image_url: '60001565-lau-ca-chua_1_1.jpg' },
  { id: 6, name: 'Lẩu Đài Bắc', price: 149000, category: 'Lẩu', image_url: '60001665-lau-dai-bac_1_1.jpg' },
  { id: 7, name: 'Lẩu Hồng Ngọc', price: 169000, category: 'Lẩu', image_url: 'lau-hong-ngoc.jpg' },

  // Bò
  { id: 8, name: 'Lõi Vai Wagyu', price: 459000, category: 'Bò', image_url: '2865-loi-vai-wagyu.jpg' },
  { id: 9, name: 'Sườn Non Bò Wagyu', price: 589000, category: 'Bò', image_url: '2972-suon-non-bo-wagyu.jpg' },
  { id: 10, name: 'Thớt Bò Thái Tay', price: 289000, category: 'Bò', image_url: '60008483-thot-bo-thai-tay_1_1.png' },
  { id: 11, name: 'Bò Thượng Hạng TOOR', price: 399000, category: 'Bò', image_url: 'b_th_ng_h_ng.jpg' },
  { id: 12, name: 'Ba Chỉ Bò Mỹ (100g)', price: 99000, category: 'Bò', image_url: 'ba_chi_bo_m_-_100g.jpg' },
  { id: 13, name: 'Bắp Bò Úc Tươi', price: 189000, category: 'Bò', image_url: 'bap_bo_uc_2.jpg' },
  { id: 14, name: 'Bắp Hoa Tươi', price: 219000, category: 'Bò', image_url: 'co_bap_hoa_tuoi_1.jpg' },
  { id: 15, name: 'Gầu Hoa Tươi', price: 199000, category: 'Bò', image_url: 'co_gu_hoa_tuoi_1.jpg' },
  { id: 16, name: 'Thịt Bò Băng Tuyết', price: 249000, category: 'Bò', image_url: 'th_t_b_b_ng_tuy_t.jpg' },
  { id: 17, name: 'Thăn Ngoại Bò Tươi', price: 329000, category: 'Bò', image_url: 'thanngoaibotuoi.png' },
  { id: 18, name: 'Bò Wagyu Thượng Hạng', price: 699000, category: 'Bò', image_url: 'thi_t_bo_wagyu_th_ng_ha_ng.jpg' },

  // Heo Cừu
  { id: 19, name: 'Ba Chỉ Heo Iberico', price: 229000, category: 'Heo Cừu', image_url: '60001584-ba-chi-heo-iberico_2_1.jpg' },
  { id: 20, name: 'Bắp Heo Mỹ Cuộn', price: 159000, category: 'Heo Cừu', image_url: 'b_p_heo_my_cu_n.jpg' },
  { id: 21, name: 'Ba Chỉ Cừu Non', price: 199000, category: 'Heo Cừu', image_url: 'bachicuu.jpg' },
  { id: 22, name: 'Má Heo Tươi', price: 129000, category: 'Heo Cừu', image_url: 'm_heo.png' },
  { id: 23, name: 'Sườn Heo Cay', price: 179000, category: 'Heo Cừu', image_url: 'mw_suon_heo_cay_1__1.jpg' }
];

const Order = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Sử dụng dữ liệu tĩnh có ảnh thật
  const menuItems = staticMenuItems;

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

  if (!user) {
    return (
      <div className="page-section" aria-busy="true">
        <PageMeta
          title="Đặt món trực tuyến | TOOR Hotpot"
          description="Chọn nước lẩu và món ăn, đặt món trực tuyến tại TOOR Hotpot — đăng nhập để hoàn tất đơn."
          path="/order"
        />
      </div>
    );
  }

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



  return (
    <section className="page-section">
      <PageMeta
        title="Đặt món trực tuyến | TOOR Hotpot"
        description="Chọn tối đa 2 nước lẩu và món kèm, thanh toán đơn giản — đặt món online TOOR Hotpot."
        path="/order"
      />
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
                <div key={broth.id} className="menu-item-box" style={{ position: 'relative', border: isSelected ? '2px solid var(--toor-red)' : '1px solid var(--toor-border)', cursor: 'pointer' }} onClick={() => handleBrothToggle(broth)}>
                  <img
                    src={`/Image/menu/${broth.image_url}`}
                    alt={broth.name}
                    className="menu-item-img"
                    onError={(e) => { e.target.src = '/Image/menu/placeholder.png'; }}
                  />
                  <div className="menu-item-name" style={{ flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '5px' }}>{broth.name}</h3>
                    <span className="price" style={{ marginTop: 0 }}>{Number(broth.price).toLocaleString('vi-VN')} VNĐ</span>
                  </div>
                  {isSelected && <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--toor-red)', color: 'var(--toor-cream)', padding: '5px 10px', borderRadius: '50%' }}>✓</div>}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              className="button button-primary"
              onClick={() => setStep(2)}
              disabled={selectedBroths.length === 0}
              style={{ fontFamily: 'iCielBC Lodestone', textTransform: 'uppercase', letterSpacing: '1px' }}
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
            <button style={{ fontFamily: 'iCielBC Lodestone', textTransform: 'uppercase', letterSpacing: '1px' }} className="button button-secondary" onClick={() => setStep(1)}>&lt; Quay lại</button>
          </div>
          {otherItems.length === 0 && <p>Chưa có đồ ăn kèm trong hệ thống.</p>}
          <div className="menu-grid-new" style={{ marginTop: '20px' }}>
            {otherItems.map(item => (
              <div key={item.id} className="menu-item-box">
                <img
                  src={`/Image/menu/${item.image_url}`}
                  alt={item.name}
                  className="menu-item-img"
                  onError={(e) => { e.target.src = '/Image/menu/placeholder.png'; }}
                />
                <div className="menu-item-name" style={{ flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '5px' }}>{item.name}</h3>
                  <span className="price" style={{ marginTop: 0 }}>{Number(item.price).toLocaleString('vi-VN')} VNĐ</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => handleItemQuantity(item, -1)} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid var(--toor-border)', cursor: 'pointer' }}>-</button>
                    <span style={{ fontWeight: 'bold' }}>{getItemQuantity(item.id)}</span>
                    <button onClick={() => handleItemQuantity(item, 1)} style={{ padding: '5px 10px', borderRadius: '5px', border: '1px solid var(--toor-border)', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              className="button button-primary"
              onClick={() => setStep(3)}
              style={{ fontFamily: 'iCielBC Lodestone', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              Xem giỏ hàng và Đặt món &gt;
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2>Bước 3: Xác nhận đơn hàng</h2>
          <div style={{ background: 'var(--toor-cream)', border: '1px solid var(--toor-border)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <h3>Thông tin khách hàng</h3>
            <p><strong>Họ tên:</strong> {user.full_name}</p>
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
          </div>

          <div style={{ background: 'var(--toor-cream)' }}>
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
            <hr style={{ margin: '20px 0', borderTop: '1px dashed var(--toor-border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 'var(--quicksand-font-size)', color: 'var(--toor-red)' }}>
              <span>Tổng thanh toán:</span>
              <span>{calculateTotal().toLocaleString('vi-VN')} VNĐ</span>
            </div>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ fontFamily: 'iCielBC Lodestone', textTransform: 'uppercase', letterSpacing: '1px' }} className="button button-secondary" onClick={() => setStep(2)}>&lt; Quay lại</button>
            <button
              className="button button-primary"
              onClick={handleCheckout}
              disabled={orderLoading}
              style={{ fontFamily: 'iCielBC Lodestone', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              {orderLoading ? 'Đang xử lý...' : 'Xác nhận Đặt Hàng'}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: 'center', padding: '50px 20px' }}>
          <h2 style={{ color: 'var(--toor-red)', fontSize: '2rem', marginBottom: '20px' }}>🎉 Đặt hàng thành công!</h2>
          <p style={{ fontSize: 'var(--quicksand-font-size)', color: 'var(--toor-muted)', marginBottom: '30px' }}>Cảm ơn <strong>{user.full_name}</strong>. Đơn hàng của bạn đã được ghi nhận. Nhà hàng sẽ chuẩn bị món ngay lập tức.</p>
          <button className="button button-primary" onClick={() => navigate('/profile')}>Xem lịch sử đơn hàng</button>
        </div>
      )}
    </section>
  );
};

export default Order;
