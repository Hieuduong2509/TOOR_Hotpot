import { useState } from 'react';
import PageMeta from '../components/PageMeta';
import { useFetchMenu } from '../hooks/useFetchMenu';

const categoryStructure = [
  {
    name: 'Món Lẻ',
    subcategories: ['Lẩu', 'Heo Cừu', 'Bò', 'Hải Sản', 'Rau Nấm', 'Viên Thả Lẩu', 'Đồ Uống']
  },
  {
    name: 'Menu buffet',
    subcategories: ['Menu 279k', 'Menu 349k', 'Menu 379']
  }
];

// Bản đồ ánh xạ chính xác thư mục và các file ảnh
const buffetImageData = {
  'Menu 279k': {
    folder: 'menu279',
    images: [
      'Screenshot 2026-05-16 221621.png',
      'Screenshot 2026-05-16 221632.png',
      'Screenshot 2026-05-16 221652.png'
    ]
  },
  'Menu 349k': {
    folder: 'menu349',
    images: ['image.png',
      'image copy.png',
      'image copy 2.png',
      'image copy 3.png'
    ]
  },
  'Menu 379': {
    folder: 'menu379',
    images: [
      'Screenshot 2026-05-16 222114.png',
      'image_379_1.png',
      'image_379_2.png',
      'image_379_3.png'
    ]
  }
};

const staticMenuItems = [
  // Lẩu
  { id: 1, name: 'Lẩu Nấm Thiên Nhiên', price: 129000, category: 'Lẩu', image_url: '60000207-lau-nam_1_1.jpg' },
  { id: 2, name: 'Lẩu Kim Chi', price: 129000, category: 'Lẩu', image_url: '60001017-lau-kim-chi_1_1.jpg' },
  { id: 3, name: 'Lẩu Mala Đài Loan', price: 159000, category: 'Lẩu', image_url: '60001563-lau-mala-dai-loan_1_1.jpg' },
  { id: 4, name: 'Lẩu Thái Chùa Cay', price: 139000, category: 'Lẩu', image_url: '60001564-lau-thai_1_1.jpg' },
  { id: 5, name: 'Lẩu Cà Chua', price: 119000, category: 'Lẩu', image_url: '60001565-lau-ca-chua_1_1.jpg' },
  { id: 6, name: 'Lẩu Đài Bắc', price: 149000, category: 'Lẩu', image_url: '60001665-lau-dai-bac_1_1.jpg' },
  { id: 7, name: 'Lẩu Hồng Ngọc', price: 169000, category: 'Lẩu', image_url: 'lau-hong-ngoc.jpg' },

  // Bò
  { id: 8, name: 'Lõi Vai Wagyu', price: 459000, category: 'Bò', image_url: '2865-loi-vai-wagyu.jpg' },
  { id: 9, name: 'Sườn Non Bò Wagyu', price: 589000, category: 'Bò', image_url: '2972-suon-non-bo-wagyu.jpg' },
  { id: 10, name: 'Thớt Bò Thái Tay', price: 289000, category: 'Bò', image_url: '60008483-thot-bo-thai-tay_1_1.png' },
  { id: 11, name: 'Bò Thượng Hạng TOOR', price: 399000, category: 'Bò', image_url: 'b_th_ng_h_ng.jpg' },
  { id: 12, name: 'Ba Chỉ Bò Mỹ (100g)', price: 99000, category: 'Bò', image_url: 'ba_chi_bo_m_-_100g.jpg' },
  { id: 13, name: 'Bắp Bò Úc Tươi', price: 189000, category: 'Bò', image_url: 'bap_bo_uc_2.jpg' },
  { id: 14, name: 'Bắp Hoa Tươi', price: 219000, category: 'Bò', image_url: 'co_bap_hoa_tuoi_1.jpg' },
  { id: 15, name: 'Gầu Hoa Tươi', price: 199000, category: 'Bò', image_url: 'co_gu_hoa_tuoi_1.jpg' },
  { id: 16, name: 'Thịt Bò Băng Tuyết', price: 249000, category: 'Bò', image_url: 'th_t_b_b_ng_tuy_t.jpg' },
  { id: 17, name: 'Thăn Ngoại Bò Tươi', price: 329000, category: 'Bò', image_url: 'thanngoaibotuoi.png' },
  { id: 18, name: 'Bò Wagyu Thượng Hạng', price: 699000, category: 'Bò', image_url: 'thi_t_bo_wagyu_th_ng_ha_ng.jpg' },

  // Heo Cừu
  { id: 19, name: 'Ba Chỉ Heo Iberico', price: 229000, category: 'Heo Cừu', image_url: '60001584-ba-chi-heo-iberico_2_1.jpg' },
  { id: 20, name: 'Bắp Heo Mỹ Cuộn', price: 159000, category: 'Heo Cừu', image_url: 'b_p_heo_my_cu_n.jpg' },
  { id: 21, name: 'Ba Chỉ Cừu Non', price: 199000, category: 'Heo Cừu', image_url: 'bachicuu.jpg' },
  { id: 22, name: 'Má Heo Tươi', price: 129000, category: 'Heo Cừu', image_url: 'm_heo.png' },
  { id: 23, name: 'Sườn Heo Cay', price: 179000, category: 'Heo Cừu', image_url: 'mw_suon_heo_cay_1__1.jpg' },

  // Combo / Khác (Ví dụ)
  { id: 24, name: 'Combo Ngũ Hành', price: 899000, category: 'Bò', image_url: 'co_combo_son_nguu_ngu_hanh.jpg' },
  { id: 25, name: 'Dẻ Sườn Bò Thái Tay', price: 319000, category: 'Bò', image_url: 'd_s_n_p_m_th_i_tay.jpg' },
  { id: 26, name: 'Bạch Tuộc Baby', price: 129000, category: 'Hải Sản', image_url: '60001591-bach-tuoc-baby_1_1.jpg' },
  { id: 27, name: 'Tôm Sú Tươi', price: 149000, category: 'Hải Sản', image_url: 'tom_su_tuoi.jpg' },
  { id: 28, name: 'Cá Tầm', price: 179000, category: 'Hải Sản', image_url: '60017198-ca-tam.jpg.png' },
  { id: 29, name: 'Cá Hồi', price: 189000, category: 'Hải Sản', image_url: 'ca-hoi_1_1.jpg' },
  { id: 30, name: 'Mực Trứng', price: 139000, category: 'Hải Sản', image_url: '60009427-myc-trung_2_1.jpg' },
  { id: 31, name: 'Tôm Thẻ Alc', price: 149000, category: 'Hải Sản', image_url: '32664-tom-the-alc.jpg' },
  { id: 32, name: 'Mực Nút', price: 129000, category: 'Hải Sản', image_url: '2900_muc_nut_2.jpg' },
  { id: 33, name: 'Rau Múc Tươi', price: 59000, category: 'Rau Nấm', image_url: 'rau_muc_tuoi.jpg' },
  { id: 34, name: 'Tuyết Liên Hoa', price: 69000, category: 'Rau Nấm', image_url: 'tuyet-lien-hoa.jpg' },
  { id: 35, name: 'Váng Xanh', price: 45000, category: 'Rau Nấm', image_url: 'v_m_xanh.jpg' },
  { id: 36, name: 'Bò Viên Mỹ', price: 89000, category: 'Viên Thả Lẩu', image_url: 'th_t_b_v_n_m_y.jpg' },
  { id: 37, name: 'Gầu Bò Mỹ', price: 179000, category: 'Bò', image_url: 'g_u_bo_my_.jpg' },
  { id: 38, name: 'Sườn Bò Hoàng Kim', price: 259000, category: 'Bò', image_url: 'suon-bo-hoang-kim_2.jpg' }
  ,
  { id: 39, name: 'Nước Suối', price: 15000, category: 'Đồ Uống', image_url: '70000929_nuoc_khoang_bonita_1.jpg' },
  { id: 40, name: 'Soju Nho', price: 25000, category: 'Đồ Uống', image_url: '70000874_ruou_him_soju_nho_360ml__chai_1.jpg' },
  { id: 41, name: 'Nước Ép Trái Cây', price: 45000, category: 'Đồ Uống', image_url: 'co_mw_haruka_crystal.jpg' },
  { id: 42, name: 'Dưa Hấu Kim Tác', price: 18000, category: 'Đồ Uống', image_url: 'nuoc-dua-hau-kim-tac.jpg' },
  { id: 43, name: 'Soju Dưa Hấu', price: 39000, category: 'Đồ Uống', image_url: 'soju-him-duahau.jpg' },
  { id: 44, name: 'Trà Sữa Trân Châu', price: 49000, category: 'Đồ Uống', image_url: 'co_mw_tra_sua_tran_chau.jpg' },
  { id: 45, name: 'Soju Vải', price: 55000, category: 'Đồ Uống', image_url: 'soju-him-vai.jpg' },
  { id: 46, name: 'Coke Zero', price: 55000, category: 'Đồ Uống', image_url: 'co_mw_coke_zero_320ml.jpg' }
];

const Menu = () => {
  const [expandedCategory, setExpandedCategory] = useState('Món Lẻ');
  const [selectedSub, setSelectedSub] = useState('Lẩu');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const isBuffet = expandedCategory === 'Menu buffet';
  const buffetInfo = buffetImageData[selectedSub] || { folder: '', images: [] };
  const buffetPhotos = buffetInfo.images;

  // Sử dụng dữ liệu tĩnh đã được map ảnh
  const filteredItems = staticMenuItems.filter((item) => {
    const currentCat = categoryStructure.find(c => c.name === expandedCategory);
    if (currentCat && currentCat.subcategories.length > 0) {
      return item.category === selectedSub;
    }
    return item.category === expandedCategory;
  });

  const handleMainClick = (catName) => {
    setExpandedCategory(catName);
    const cat = categoryStructure.find(c => c.name === catName);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSub(cat.subcategories[0]);
    } else {
      setSelectedSub(null);
    }
    setCurrentImgIndex(0);
  };

  const handleSubClick = (subName) => {
    setSelectedSub(subName);
    setCurrentImgIndex(0);
  };

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % buffetPhotos.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + buffetPhotos.length) % buffetPhotos.length);
  };

  return (
    <section className="page-section">
      <PageMeta
        title="Thực đơn"
        description="Khám phá thực đơn đa dạng tại TOOR Hotpot — từ các loại nước lẩu đặc sắc đến món nhúng tươi ngon."
        path="/menu"
      />
      <div className="breadcrumb">Trang chủ &gt; Thực đơn</div>
      <h1 style={{ color: 'var(--toor-red)' }}>THỰC ĐƠN</h1>

      <div className="menu-layout">
        <aside className="menu-sidebar">
          {categoryStructure.map((cat) => (
            <div key={cat.name} className="category-group">
              <div
                className={`category-title ${expandedCategory === cat.name ? 'active' : ''}`}
                onClick={() => handleMainClick(cat.name)}
              >
                {cat.name}
              </div>
              {expandedCategory === cat.name && cat.subcategories.length > 0 && (
                <ul className="subcategory-list">
                  {cat.subcategories.map(sub => (
                    <li
                      key={sub}
                      className={`subcategory-item ${selectedSub === sub ? 'active' : ''}`}
                      onClick={() => handleSubClick(sub)}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        <main className="menu-content">
          {isBuffet ? (
            <div className="buffet-gallery">
              {buffetPhotos.length > 0 ? (
                <div className="gallery-container">
                  <button className="nav-btn prev" onClick={prevImg} disabled={buffetPhotos.length <= 1}>❮</button>
                  <div className="image-frame">
                    <img
                      src={encodeURI(`/Image/${buffetInfo.folder}/${buffetPhotos[currentImgIndex]}`)}
                      alt={`${selectedSub} page ${currentImgIndex + 1}`}
                    />
                  </div>
                  <button className="nav-btn next" onClick={nextImg} disabled={buffetPhotos.length <= 1}>❯</button>
                </div>
              ) : (
                <p className="no-items">Thực đơn cho gói này đang được cập nhật...</p>
              )}
            </div>
          ) : (
            <>
              {filteredItems.length === 0 && (
                <p className="no-items">Hiện chưa có món ăn nào trong mục này.</p>
              )}
              <div className="menu-grid-new">
                {filteredItems.map(item => (
                  <div key={item.id} className="menu-item-box">
                    <img
                      src={`/Image/menu/${item.image_url}`}
                      alt={item.name}
                      className="menu-item-img"
                      onError={(e) => { e.target.src = '/Image/menu/placeholder.png'; }}
                    />
                    <div className="menu-item-name">
                      <h3>{item.name}</h3>
                      <span className="price">{Number(item.price).toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default Menu;
