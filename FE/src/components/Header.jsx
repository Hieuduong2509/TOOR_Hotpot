import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ isHomePage }) => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = !isHomePage || isScrolled;
  const textColor = isDarkText ? 'var(--toor-ink)' : 'var(--toor-cream)';

  const toggleDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <header
      className={`header ${isScrolled ? 'is-scrolled' : ''} ${isHomePage ? 'header--home' : ''}`}
      style={{ color: textColor }}
    >
      <div className="header-brand">
        {window.location.pathname !== '/booking' && (
          <NavLink to="/" className="brand brand-link" end aria-label="TOOR — Trang chủ" onClick={closeDropdown}>
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
          <NavLink to="/" end onClick={closeDropdown}>Trang chủ</NavLink>
          <NavLink to="/menu" onClick={closeDropdown}>Thực đơn</NavLink>
          <NavLink to="/order" onClick={closeDropdown}>Đặt món</NavLink>
          <NavLink to="/booking" onClick={closeDropdown}>Đặt bàn</NavLink>

          {/* Desktop links - hidden on mobile via CSS dropdown logic */}
          <NavLink to="/contact" className="desktop-link">Liên hệ</NavLink>
          {!user ? (
            <NavLink to="/login" className="desktop-link">Đăng nhập</NavLink>
          ) : (
            <NavLink to="/profile" className="desktop-link" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
              {user.full_name || user.username}
            </NavLink>
          )}

          {/* Mobile "Khác" (More) trigger button */}
          <button className="mobile-more-btn" onClick={toggleDropdown} aria-expanded={showDropdown}>
            <svg className="menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Dropdown Menu rendered outside header-nav to bypass overflow hidden constraints! */}
      {showDropdown && (
        <div className="mobile-dropdown-overlay" onClick={closeDropdown}>
          <div className="mobile-dropdown-menu" onClick={(e) => e.stopPropagation()}>
            <h3 className="dropdown-title">Danh Mục Khác</h3>
            <div className="dropdown-divider"></div>
            <NavLink to="/contact" className="dropdown-item" onClick={closeDropdown}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Liên hệ
            </NavLink>
            {!user ? (
              <NavLink to="/login" className="dropdown-item" onClick={closeDropdown}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                Đăng nhập
              </NavLink>
            ) : (
              <NavLink to="/profile" className="dropdown-item" onClick={closeDropdown}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                Tài khoản
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
