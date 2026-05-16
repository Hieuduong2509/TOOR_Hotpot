import { useCallback, useId, useState } from 'react';

const SLIDES = [
  {
    src: '/images/pro1.png',
    alt: 'Khuyến mãi buffet lẩu — miễn phí up size',
  },
  {
    src: '/images/pro2.png',
    alt: 'Khuyến mãi — tặng buffet nước',
  },
];

/** 5 trang — luân phiên cặp ảnh (đủ 5 dots như mockup). */
const PAGE_COUNT = 5;

function pairForPage(page) {
  const swap = page % 2 === 1;
  return swap ? [SLIDES[1], SLIDES[0]] : [SLIDES[0], SLIDES[1]];
}

const PromotionsSection = () => {
  const [page, setPage] = useState(0);
  const headingId = useId();
  const [left, right] = pairForPage(page);

  const go = useCallback((delta) => {
    setPage((p) => {
      const next = p + delta;
      if (next < 0) return PAGE_COUNT - 1;
      if (next >= PAGE_COUNT) return 0;
      return next;
    });
  }, []);

  return (
    <section className="promo" aria-labelledby={headingId}>
      <div className="promo__inner">
        <h2 id={headingId} className="promo__title">
          Khuyến mãi
        </h2>

        <div className="promo__slider">
          <div className="promo__row">
            <button
              type="button"
              className="promo__arrow"
              onClick={() => go(-1)}
              aria-label="Trang khuyến mãi trước"
            >
              ‹
            </button>

            <div className="promo__stage">
              <div className="promo__pair" key={page}>
                <div className="promo__card">
                  <img
                    className="promo__img"
                    src={left.src}
                    alt={left.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="promo__card">
                  <img
                    className="promo__img"
                    src={right.src}
                    alt={right.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              className="promo__arrow"
              onClick={() => go(1)}
              aria-label="Trang khuyến mãi sau"
            >
              ›
            </button>
          </div>

          <div className="promo__bar">
            <div className="promo__dots" role="group" aria-label="Chọn trang khuyến mãi">
              {Array.from({ length: PAGE_COUNT }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-current={i === page ? 'true' : undefined}
                  aria-label={`Trang ${i + 1}`}
                  className={`promo__dot${i === page ? ' promo__dot--active' : ''}`}
                  onClick={() => setPage(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
