
const Contact = () => {
  return (
    <section className="page-section contact-section">
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
          <p style={{ fontWeight: 'bold' }}>TOOR Hotpot - Chuỗi nhà hàng lẩu cao cấp.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img width="24" height="24" src="https://img.icons8.com/?size=100&id=qbDdDnJoMZMV&format=png&color=000000" alt="address" /><strong>Địa chỉ:</strong> Tầng 4, Crescent Mall, 101 Tôn Dật Tiên, Phường Tân Mỹ, TP. Hồ Chí Minh</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img width="24" height="24" src="https://img.icons8.com/?size=100&id=12921&format=png&color=000000" alt="phone" /><strong>Điện thoại:</strong> +84 28 3911 1100</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img width="24" height="24" src="https://img.icons8.com/?size=100&id=s0rF94zLrv5y&format=png&color=000000" alt="time" /><strong>Giờ làm việc:</strong> 10:00 - 23:00 mỗi ngày</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img width="24" height="24" src="https://img.icons8.com/?size=100&id=YbPqIO0gOrT3&format=png&color=000000" alt="email" /><strong>Email:</strong> dhtonducthang@tdtu.edu.vn</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img width="24" height="24" src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook" />
              <strong>Facebook:</strong> <a href="https://facebook.com/dhtonducthang" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1f2937' }}>facebook.com/dhtonducthang</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img width="24" height="24" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram" />
              <strong>Instagram:</strong> <a href="https://instagram.com/dhtonducthang" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1f2937' }}>instagram.com/dhtonducthang</a>
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
