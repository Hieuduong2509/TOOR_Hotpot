import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ isHomePage }) => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = !isHomePage || isScrolled;
  const textColor = isDarkText ? 'var(--toor-ink)' : 'var(--toor-cream)';
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'var(--toor-cream)' : textColor,
  });

  return (
    <header
      className={`header ${isScrolled ? 'is-scrolled' : ''} ${isHomePage ? 'header--home' : ''}`}
      style={{ color: textColor }}
    >
      <div className="header-brand">
        {window.location.pathname !== '/booking' && (
          <NavLink to="/" className="brand brand-link" end aria-label="TOOR — Trang chủ">
            <img
              className="brand-logo"
              src={(isHomePage && !isScrolled) ? '/images/logo%20toor-02.svg' : '/images/logo%20toor-01.svg'}
              alt="TOOR Hotpot Together"
              width={375}
              height={117}
            />
          </NavLink>
        )}
      </div>
      <div className="header-nav">
        <nav className="nav-links" aria-label="Điều hướng chính">
          <NavLink to="/" style={navLinkStyle} end>Trang chủ</NavLink>
          <NavLink to="/menu" style={navLinkStyle}>Thực đơn</NavLink>
          <NavLink to="/order" style={navLinkStyle}>Đặt món</NavLink>
          <NavLink to="/booking" style={navLinkStyle}>Đặt bàn</NavLink>
          <NavLink to="/contact" style={navLinkStyle}>Liên hệ</NavLink>
          {!user ? (
            <NavLink to="/login" style={navLinkStyle}>Đăng nhập</NavLink>
          ) : (
            <NavLink to="/profile" style={({ isActive }) => ({ fontWeight: 'bold', ...navLinkStyle({ isActive }) })}>
              {user.full_name || user.username}
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
