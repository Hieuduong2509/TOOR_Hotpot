import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../gsapClient';
import { motionDuration } from '../lib/motion';

const HomeToorStory = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const d = motionDuration(0.7);
      const yOff = d < 0.02 ? 0 : 44;

      gsap.from('.toor-story__copy', {
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        x: -yOff,
        autoAlpha: 0,
        duration: d,
        ease: 'power2.out',
      });

      gsap.from('.toor-story__visual', {
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        x: yOff,
        autoAlpha: 0,
        duration: d,
        ease: 'power2.out',
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="toor-story" aria-labelledby="toor-story-heading">
      <div className="toor-story__inner">
        <div className="toor-story__copy">
          <h2 id="toor-story-heading" className="toor-story__title">
            CÂU CHUYỆN TOOR
          </h2>
          <div className="toor-story__rule" aria-hidden="true" />
          <p>
            TOOR là một mô hình dịch vụ ẩm thực thuộc ngành F{'&'}B, tập trung vào loại hình lẩu
            châu Á theo hướng hiện đại, trải nghiệm và có định hướng nhận diện thị giác rõ ràng.
          </p>
          <p>
            Thương hiệu không chỉ cung cấp sản phẩm là món ăn, mà xây dựng một không gian nơi
            khách hàng có thể tương tác, kết nối và chia sẻ trải nghiệm thông qua việc cùng nhau
            thưởng thức lẩu.
          </p>
          <p>
            Lẩu trong TOOR được xem như một &ldquo;trung tâm trải nghiệm&rdquo; – nơi mọi yếu tố
            từ hương vị, không gian đến hình ảnh đều xoay quanh sự kết nối và chuyển động.
          </p>
        </div>
        <div className="toor-story__visual">
          <img
            src="/images/9.png"
            alt="Mâm lẩu ba ngăn cùng hải sản, thịt và rau củ trên bàn đá cẩm thạch trắng"
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeToorStory;
