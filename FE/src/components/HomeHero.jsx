import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../gsapClient';
import { motionDuration } from '../lib/motion';

const HomeHero = () => {
  const root = useRef(null);

  useGSAP(
    () => {
      const d = motionDuration(0.85);
      gsap.from('.home-hero__line', {
        y: d < 0.02 ? 0 : 40,
        autoAlpha: 0,
        stagger: d < 0.02 ? 0 : 0.16,
        duration: d,
        ease: 'power3.out',
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="home-hero" aria-label="TOOR Hotpot — trang chủ">
      <div className="home-hero__inner">
        <h1 className="home-hero__title">
          <span className="home-hero__line">NGŨ VỊ GIAO HÒA</span>
          <span className="home-hero__line">GẮN KẾT THĂNG HOA</span>
        </h1>
      </div>
    </section>
  );
};

export default HomeHero;
