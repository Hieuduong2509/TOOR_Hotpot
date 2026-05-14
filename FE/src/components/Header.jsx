import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="brand">Hotpot Restaurant</div>
      <nav className="nav-links">
        <NavLink to="/" end>Trang chủ</NavLink>
        <NavLink to="/menu">Thực đơn</NavLink>
        <NavLink to="/order">Đặt món</NavLink>
        <NavLink to="/booking">Đặt bàn</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
        {/* <NavLink to="/cart">Giỏ hàng</NavLink> */}
        {user ? (
          <NavLink to="/profile" style={{ fontWeight: 'bold', color: '#60a5fa' }}>{user.full_name || user.username}</NavLink>
        ) : (
          <NavLink to="/login">Đăng nhập</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
