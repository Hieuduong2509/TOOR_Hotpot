import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-wrap">
      <div className="footer__decor-top">
        <img
          className="footer__noodle-full"
          src="/images/cọng mì.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="footer__mascot"
          src="/images/hehe.png"
          alt="TOOR mascot"
        />
      </div>
      <footer className="footer" aria-label="Chân trang TOOR Hotpot">
        <div className="footer__inner">
          <div className="footer__grid">
            <div className="footer__col footer__col--brand">
              <NavLink to="/" className="footer__brand-link" end aria-label="TOOR — Trang chủ">
                <img
                  className="footer__logo"
                  src="/images/logo%20toor-02.svg"
                  alt="TOOR Hotpot Together"
                  width={490}
                  height={634}
                />
              </NavLink>
            </div>

            <div className="footer__col">
              <h2 className="footer__heading">Khám phá</h2>
              <nav className="footer__nav-wrap" aria-label="Điều hướng chân trang">
                <ul className="footer__nav">
                  <li>
                    <NavLink to="/" className="footer__link" end>
                      Trang chủ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/menu" className="footer__link">
                      Thực đơn
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/order" className="footer__link">
                      Đặt món
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/booking" className="footer__link">
                      Đặt bàn
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className="footer__link">
                      Liên hệ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="footer__link">
                      Đăng nhập
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="footer__col">
              <h2 className="footer__heading">Liên hệ</h2>
              <div className="footer__contact-list">
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a className="footer__link footer__link--inline footer__contact-text" href="tel:1900234546">
                    1900 234 546
                  </a>
                </div>
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="footer__contact-text">TOOR hotpot</span>
                </div>
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a className="footer__link footer__link--inline footer__contact-text" href="mailto:marketing.mn@toorhotpot.vn">
                    marketing.mn@toorhotpot.vn
                  </a>
                </div>
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <a className="footer__link footer__link--inline footer__contact-text" href="https://toorhotpot.vn" target="_blank" rel="noreferrer">
                    toorhotpot.vn
                  </a>
                </div>
                <div className="footer__contact-item">
                  <svg className="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="footer__contact-text">Tầng 4 Cresent Mall, phường Tân Mỹ, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">© 2026 TOOR Hotpot. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
