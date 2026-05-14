import React from 'react';

const Home = () => {
  return (
    <section className="page-section hero-section" style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      borderRadius: '24px',
      margin: '0',
      border: 'none'
    }}>
      {/* Split Background Images */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50%',
        height: '100%',
        backgroundImage: `url('/images/menu_bg_1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        backgroundImage: `url('/images/menu_bg_2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Subtle vignette overlay to ensure text contrast and blend edges */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))',
        zIndex: 1,
      }} />

      {/* Glassmorphism Content Box */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(20, 20, 20, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        padding: '3rem',
        maxWidth: '900px',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <span className="eyebrow" style={{ 
          color: '#fca5a5', 
          fontSize: '1.1rem', 
          textTransform: 'uppercase', 
          letterSpacing: '2px',
          fontWeight: '800',
          display: 'block',
          marginBottom: '1rem'
        }}>
          Hương vị trọn vẹn
        </span>
        <h1 style={{ 
          color: 'white', 
          textShadow: '0 2px 4px rgba(0,0,0,0.5)', 
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
          margin: '0 0 1.5rem 0',
          lineHeight: '1.2'
        }}>
          Trải nghiệm lẩu và set menu phong cách Hotpot Story & Manwah
        </h1>
        <p style={{ 
          color: '#f8fafc', 
          fontSize: '1.2rem', 
          textShadow: '0 1px 2px rgba(0,0,0,0.5)', 
          lineHeight: '1.6', 
          marginBottom: '2.5rem',
          maxWidth: '700px',
          margin: '0 auto 2.5rem auto'
        }}>
          Không gian ấm cúng, thực đơn đa dạng từ lẩu thập cẩm, buffet đến set menu gia đình. Đặt bàn nhanh chóng và tận hưởng dịch vụ chuyên nghiệp.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.2)', 
            padding: '1rem 2rem', 
            borderRadius: '12px', 
            fontWeight: '600',
            backdropFilter: 'blur(4px)'
          }}>
            Thực đơn lẩu đặc sắc
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.2)', 
            padding: '1rem 2rem', 
            borderRadius: '12px', 
            fontWeight: '600',
            backdropFilter: 'blur(4px)'
          }}>
            Buffet tự chọn đa dạng
          </div>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.2)', 
            padding: '1rem 2rem', 
            borderRadius: '12px', 
            fontWeight: '600',
            backdropFilter: 'blur(4px)'
          }}>
            Set menu cho gia đình
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
