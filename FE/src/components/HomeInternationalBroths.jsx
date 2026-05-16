import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../gsapClient';
import { motionDuration } from '../lib/motion';

const BROTHS = [
  {
    label: 'Nước lẩu Bulgogi',
    alt: 'Nồi súp Hàn đang sôi, màu nâu đậm với rau củ',
    src: '/images/22.png',
  },
  {
    label: 'Nước lẩu Nấm',
    alt: 'Tô súp kem nấm, nhìn từ trên',
    src: '/images/20.png',
  },
  {
    label: 'Nước lẩu Dưỡng Sinh',
    alt: 'Súp trắng kem trong nồi gốm đen',
    src: '/images/21.png',
  },
  {
    label: 'Nước lẩu Tomyum',
    alt: 'Nồi Tom Yum hải sản cay, sả và chanh',
    src: '/images/18.png',
  },
  {
    label: 'Nước lẩu Tứ Xuyên',
    alt: 'Bàn lẩu với nồi nước dùng và nguyên liệu',
    src: '/images/19.png',
  },
];

const HomeInternationalBroths = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const d = motionDuration(0.65);
      const active = d >= 0.02;

      gsap.from('.intl-broths__head', {
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
        y: active ? -28 : 0,
        autoAlpha: 0,
        duration: d,
        ease: 'power2.out',
      });

      gsap.from('.intl-broths__mascot-wrap', {
        scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none none' },
        scale: active ? 0.88 : 1,
        rotation: active ? -4 : 0,
        autoAlpha: 0,
        duration: motionDuration(0.75),
        ease: 'back.out(1.4)',
      });

      gsap.from('.intl-broths__item', {
        scrollTrigger: { trigger: el, start: 'top 65%', toggleActions: 'play none none none' },
        y: active ? 36 : 0,
        autoAlpha: 0,
        stagger: active ? 0.08 : 0,
        duration: d,
        ease: 'power2.out',
      });

      gsap.from('.intl-broths__copy', {
        scrollTrigger: { trigger: el, start: 'top 55%', toggleActions: 'play none none none' },
        y: active ? 24 : 0,
        autoAlpha: 0,
        duration: motionDuration(0.55),
        ease: 'power1.out',
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="intl-broths" aria-labelledby="intl-broths-heading">
      <div className="intl-broths__stage">
        <header className="intl-broths__head">
          <h2 id="intl-broths-heading" className="intl-broths__heading">
            <span className="intl-broths__num">5</span>
            <span className="intl-broths__title-text">VỊ LẨU QUỐC TẾ</span>
          </h2>
        </header>

        <div className="intl-broths__band">
          <div className="intl-broths__mascot-wrap">
            <img
              className="intl-broths__mascots"
              src="/images/10.png"
              alt="Hai nhân vật hoạt hình TOOR đang nấu ăn"
              width={520}
              height={340}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="intl-broths__bottom">
            <ul className="intl-broths__list">
              {BROTHS.map((item) => (
                <li key={item.label} className="intl-broths__item">
                  <div className="intl-broths__thumb">
                    <img src={item.src} alt={item.alt} width={280} height={280} loading="lazy" decoding="async" />
                  </div>
                  <p className="intl-broths__label">{item.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="intl-broths__copy">
          <p>
            5 vị lẩu quốc tế: Suki, Tomyum – Thái Lan; Tứ Xuyên – Trung Quốc; Miso – Nhật và Bulgogi
            – Hàn để thực khách có được chuyến du hành vị giác qua các vùng miền khác nhau, để có
            những bữa ăn ngon nhất.
          </p>
          <p>
            Giữ những cốt lõi của vị lẩu bản địa, các đầu bếp tại TOOR đã điều chỉnh, cân bằng để
            mang đến những nồi lẩu ngăn đôi hợp ý với người Việt, đạt &ldquo;10 điểm vẹn
            toàn&rdquo; với các loại nhân nhúng tuyệt hảo và quầy line full ngon bất tận.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeInternationalBroths;
