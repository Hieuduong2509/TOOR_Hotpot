import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';

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
  {
    id: 3,
    name: 'TOOR Hotpot - Đà Nẵng',
    address: '456 Võ Nguyên Giáp, Đà Nẵng',
    open: '10:00',
    close: '22:30',
    phone: '+84 23 6388 8888',
  },
];

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [formValues, setFormValues] = useState({
    date: '',
    time: '',
    guest_count: 2,
  });

  const resultsRef = useRef(null);

  // Kiểm tra đăng nhập giống trang Đặt món
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/booking' } } });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // Tự động cuộn xuống phần kết quả khi qua Step 2
  useEffect(() => {
    if (step > 1 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  if (!user) {
    return (
      <div className="booking-page-container">
        <PageMeta
          title="Đặt bàn | TOOR Hotpot"
          description="Đăng nhập để đặt bàn tại TOOR Hotpot."
          path="/booking"
        />
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      <PageMeta
        title="Đặt bàn | TOOR Hotpot"
        description="Đặt bàn trực tuyến tại TOOR Hotpot — chọn chi nhánh, ngày giờ và số khách."
        path="/booking"
      />

      {/* SECTION 1: HERO & INPUT FORM */}
      <section
        className="booking-page-hero"
        style={{ backgroundImage: "url('/images/image.png')" }}
      >
        <div className="booking-hero-content">
          <div className="booking-form-step1">
            <div className="bf-inputs-group">
              <div className="bf-input-col">
                <span className="bf-label">Số người:</span>
                <select className="bf-select" name="guest_count" value={formValues.guest_count} onChange={handleChange}>
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
              <div className="bf-input-col">
                <span className="bf-label">Ngày:</span>
                <input className="bf-date" type="date" name="date" value={formValues.date} onChange={handleChange} required />
              </div>
              <div className="bf-input-col">
                <span className="bf-label">Giờ:</span>
                <select className="bf-select" name="time" value={formValues.time} onChange={handleChange} required>
                  <option value="" disabled hidden>Chọn giờ</option>
                  {['10:00', '11:00', '12:00', '13:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="bf-submit-btn" onClick={nextStep}>TÌM CHI NHÁNH</button>
          </div>
        </div>
      </section>

      {/* SECTION 2: RESULTS (Show Step 2, 3 here) */}
      <section className={`booking-results-area ${step > 1 ? 'is-visible' : ''}`} ref={resultsRef}>
        <div className="page-content">
          {step === 2 && (
            <div className="booking-results-wrapper">
              <h2 className="results-title">CHỌN CHI NHÁNH PHÙ HỢP</h2>
              <div className="branch-grid">
                {restaurantsData.map((rest) => (
                  <div 
                    key={rest.id} 
                    className={`branch-card ${selectedRestaurant?.id === rest.id ? 'active' : ''}`}
                    onClick={() => setSelectedRestaurant(rest)}
                  >
                    <div className="branch-card-info">
                      <h3>{rest.name}</h3>
                      <p className="address">{rest.address}</p>
                      <p className="hours">Mở cửa: {rest.open} - {rest.close}</p>
                    </div>
                    <div className="branch-card-select">
                       <div className="radio-circle"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="results-actions">
                <button className="btn-secondary" onClick={prevStep}>QUAY LẠI</button>
                <button 
                  className="btn-primary" 
                  disabled={!selectedRestaurant}
                  onClick={nextStep}
                >
                  XÁC NHẬN CHI NHÁNH
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="booking-confirmation-wrapper">
              <div className="confirmation-header">
                <div className="success-check">✓</div>
                <h2>XÁC NHẬN THÔNG TIN ĐẶT BÀN</h2>
              </div>
              
              <div className="summary-grid">
                <div className="summary-item">
                  <label>Khách hàng:</label>
                  <span>{user?.full_name || 'Khách vãng lai'}</span>
                </div>
                <div className="summary-item">
                  <label>Số điện thoại:</label>
                  <span>{user?.phone || 'Chưa cập nhật'}</span>
                </div>
                <div className="summary-item">
                  <label>Chi nhánh:</label>
                  <span className="highlight">{selectedRestaurant?.name}</span>
                </div>
                <div className="summary-item">
                  <label>Thời gian:</label>
                  <span className="highlight">{formValues.time} - {formValues.date}</span>
                </div>
                <div className="summary-item">
                  <label>Số lượng:</label>
                  <span>{formValues.guest_count} khách</span>
                </div>
              </div>

              <div className="results-actions">
                <button className="btn-secondary" onClick={prevStep}>QUAY LẠI</button>
                <button className="btn-primary" onClick={() => alert('Đặt bàn thành công!')}>HOÀN TẤT ĐẶT BÀN</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;
