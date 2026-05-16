import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../gsapClient';
import { motionDuration } from '../lib/motion';

/** Ảnh không gian thật trong cửa hàng Toor (`FE/public/images/…`). */
const SPACE_IMAGE_SRC = '/images/cửa hàng bên trong.jpg';

const HomeSpaceSection = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const d = motionDuration(0.72);
      const active = d >= 0.02;
      const shift = active ? 56 : 0;

      gsap.from('.home-space__visual', {
        scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
        x: -shift,
        scale: active ? 0.96 : 1,
        autoAlpha: 0,
        duration: d,
        ease: 'power3.inOut',
      });

      gsap.from('.home-space__copy', {
        scrollTrigger: { trigger: el, start: 'top 78%', toggleActions: 'play none none none' },
        x: shift,
        autoAlpha: 0,
        duration: d,
        ease: 'power2.out',
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="home-space" aria-labelledby="home-space-heading">
      <div className="home-space__inner">
        <div className="home-space__visual">
          <img
            src={SPACE_IMAGE_SRC}
            alt="Không gian nhà hàng Toor Hotpot — khu bàn ăn và khu vực phục vụ"
            loading="lazy"
            decoding="async"
            width={2904}
            height={1472}
          />
        </div>
        <div className="home-space__copy">
          <h2 id="home-space-heading" className="home-space__title">
            KHÔNG GIAN
          </h2>
          <div className="home-space__rule" aria-hidden="true" />
          <p>
            Không gian nhà hàng Toor được thiết kế theo tinh thần trẻ trung, mở và linh hoạt, tạo
            cảm giác gần gũi như một điểm hẹn hơn là nhà hàng truyền thống. Bố cục không gian ưu
            tiên sự thoải mái và kết nối, phù hợp cho cả nhóm bạn nhỏ lẫn các buổi tụ họp đông
            người.
          </p>
          <p>
            Thiết kế mang hơi hướng tối giản nhưng ấm áp, kết hợp các chi tiết năng động để khơi
            gợi tinh thần &ldquo;gắn kết&rdquo;. Toor không chỉ là nơi ăn lẩu tại chỗ, mà còn là
            điểm khởi đầu cho trải nghiệm &ldquo;hotpot at home&rdquo;, nơi khách hàng luôn cảm
            nhận được sự liền mạch giữa nhà hàng và đời sống thường ngày.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSpaceSection;
