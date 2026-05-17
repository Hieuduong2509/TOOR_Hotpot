import PageMeta from '../components/PageMeta';

const Contact = () => {
  return (
    <section className="page-section contact-section">
      <PageMeta
        title="Liên hệ | TOOR Hotpot"
        description="Liên hệ TOOR Hotpot — địa chỉ Crescent Mall Tôn Dật Tiên, hotline, email và bản đồ. Hỗ trợ đặt bàn và câu hỏi chung."
        path="/contact"
      />
      <div className="page-header">
        <h1>Liên hệ</h1>
      </div>
      <div className="contact-layout">
        <div className="contact-map">
          <iframe
            title="Vị trí nhà hàng"
            src="https://maps.google.com/maps?q=Crescent%20Mall,%20101%20Tôn%20Dật%20Tiên,%20Tân%20Mỹ,%20Hồ%20Chí%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <p style={{ fontWeight: 'bold', color: 'var(--toor-ink)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
            TOOR Hotpot - Chuỗi nhà hàng lẩu cao cấp.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <img style={{ marginTop: '3px', flexShrink: 0 }} width="24" height="24" src="https://img.icons8.com/?size=100&id=qbDdDnJoMZMV&format=png&color=000000" alt="address" />
              <div style={{ flex: 1, color: 'var(--toor-ink)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <strong>Địa chỉ:</strong> Tầng 4, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Mỹ, TP. Hồ Chí Minh
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <img style={{ marginTop: '3px', flexShrink: 0 }} width="24" height="24" src="https://img.icons8.com/?size=100&id=12921&format=png&color=000000" alt="phone" />
              <div style={{ flex: 1, color: 'var(--toor-ink)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <strong>Điện thoại:</strong> +84 28 3911 1100
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <img style={{ marginTop: '3px', flexShrink: 0 }} width="24" height="24" src="https://img.icons8.com/?size=100&id=s0rF94zLrv5y&format=png&color=000000" alt="time" />
              <div style={{ flex: 1, color: 'var(--toor-ink)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <strong>Giờ làm việc:</strong> 10:00 - 23:00 mỗi ngày
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <img style={{ marginTop: '3px', flexShrink: 0 }} width="24" height="24" src="https://img.icons8.com/?size=100&id=YbPqIO0gOrT3&format=png&color=000000" alt="email" />
              <div style={{ flex: 1, color: 'var(--toor-ink)', fontSize: '0.95rem', lineHeight: '1.5', wordBreak: 'break-all' }}>
                <strong>Email:</strong> dhtonducthang@tdtu.edu.vn
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <img style={{ marginTop: '3px', flexShrink: 0 }} width="24" height="24" src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook" />
              <div style={{ flex: 1, color: 'var(--toor-ink)', fontSize: '0.95rem', lineHeight: '1.5', wordBreak: 'break-all' }}>
                <strong>Facebook:</strong>{' '}
                <a href="https://facebook.com/dhtonducthang" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--toor-red)', fontWeight: '600' }}>
                  facebook.com/dhtonducthang
                </a>
              </div>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <img style={{ marginTop: '3px', flexShrink: 0 }} width="24" height="24" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram" />
              <div style={{ flex: 1, color: 'var(--toor-ink)', fontSize: '0.95rem', lineHeight: '1.5', wordBreak: 'break-all' }}>
                <strong>Instagram:</strong>{' '}
                <a href="https://instagram.com/dhtonducthang" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--toor-red)', fontWeight: '600' }}>
                  instagram.com/dhtonducthang
                </a>
              </div>
            </li>
          </ul>
          <div className="contact-cards">
            <div>
              <h3>Đặt bàn</h3>
              <p>Vui lòng truy cập trang Đặt bàn để chọn chi nhánh và ngày giờ phù hợp.</p>
            </div>
            <div>
              <h3>Hỗ trợ</h3>
              <p>Hotline phục vụ 24/7 cho mọi thắc mắc.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
