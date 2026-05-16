import React from 'react';

const DISHES = [
  {
    src: '/images/1.png',
    title: 'BÒ NÚI LỬA',
    alt: 'Thịt bò thái lát xếp hình núi lửa, khói dry ice',
  },
  {
    src: '/images/2.png',
    title: 'SƯỜN BÒ MỸ KHÔNG XƯƠNG',
    alt: 'Sườn bò Mỹ không xương thái lát treo trên giá gỗ trên đá',
  },
  {
    src: '/images/3.png',
    title: 'LÕI NẠC VAI THƯỢNG HẠNG',
    alt: 'Gắp thịt bò thái mỏng nhúng vào nồi lẩu hai ngăn',
  },
  {
    src: '/images/4.png',
    title: 'ĐẬU HŨ HẢI SẢN PHÔ MAI',
    alt: 'Đậu hũ nhúng vào chén nước chấm',
  },
  {
    src: '/images/5.png',
    title: 'SỔ TAY NƯỚC CHẤM',
    alt: 'Pha nước chấm với gia vị trong chén sứ',
  },
  {
    src: '/images/6.png',
    title: 'TÔM TƯƠI NGỌT',
    alt: 'Tôm tươi gắp ra từ nồi lẩu',
  },
];

const HomeSpecialDishes = () => (
  <section className="special-dishes" aria-labelledby="special-dishes-heading">
    <header className="special-dishes__head">
      <div className="special-dishes__head-inner">
        <h2 id="special-dishes-heading" className="special-dishes__title">
          <span className="special-dishes__title-line" aria-hidden="true" />
          <span className="special-dishes__title-text">MÓN ĂN ĐẶC SẮC</span>
          <span className="special-dishes__title-line" aria-hidden="true" />
        </h2>
      </div>
    </header>

    <div className="special-dishes__inner">
      <ul className="special-dishes__grid">
        {DISHES.map((d) => (
          <li key={d.src} className="special-dishes__cell">
            <div className="special-dishes__frame">
              <img src={d.src} alt={d.alt} width={480} height={480} loading="lazy" decoding="async" />
            </div>
            <p className="special-dishes__caption">{d.title}</p>
          </li>
        ))}
      </ul>
    </div>

    <div className="special-dishes__foot" aria-hidden="true">
      <div className="special-dishes__rule" />
      <div className="special-dishes__after-white" />
    </div>
  </section>
);

export default HomeSpecialDishes;
