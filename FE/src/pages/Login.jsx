import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', full_name: '', phone: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
      } else {
        await register(formData);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <section className="page-section" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <PageMeta
        title="Đăng nhập | TOOR Hotpot"
        description="Đăng nhập hoặc đăng ký tài khoản TOOR Hotpot để đặt món và quản lý đơn hàng."
        path="/login"
        robots="noindex, nofollow"
      />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
      {error && <div className="message error" style={{ marginBottom: '15px' }}>{error}</div>}
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Tên đăng nhập
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <label>
          Mật khẩu
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        {!isLogin && (
          <>
            <label>
              Họ và tên
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
            </label>
            <label>
              Số điện thoại
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
          </>
        )}
        <button type="submit" className="button button-primary" style={{ marginTop: '10px' }}>
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? (
          <p>Chưa có tài khoản? <span style={{ color: 'var(--toor-red)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(false)}>Đăng ký ngay</span></p>
        ) : (
          <p>Đã có tài khoản? <span style={{ color: 'var(--toor-red)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setIsLogin(true)}>Đăng nhập</span></p>
        )}
      </div>
    </section>
  );
};

export default Login;
