const fs = require('fs');
const path = require('path');

// Nạp .env TRƯỚC KHI require database
const envPath = path.join(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

const { pool } = require('../core/config/database');

const items = [
  { id: 1, name: 'Lẩu Nấm Thiên Nhiên', price: 129000, category: 'Lẩu', image_url: '60000207-lau-nam_1_1.jpg' },
  { id: 2, name: 'Lẩu Kim Chi', price: 129000, category: 'Lẩu', image_url: '60001017-lau-kim-chi_1_1.jpg' },
  { id: 3, name: 'Lẩu Mala Đài Loan', price: 159000, category: 'Lẩu', image_url: '60001563-lau-mala-dai-loan_1_1.jpg' },
  { id: 4, name: 'Lẩu Thái Chùa Cay', price: 139000, category: 'Lẩu', image_url: '60001564-lau-thai_1_1.jpg' },
  { id: 5, name: 'Lẩu Cà Chua', price: 119000, category: 'Lẩu', image_url: '60001565-lau-ca-chua_1_1.jpg' },
  { id: 6, name: 'Lẩu Đài Bắc', price: 149000, category: 'Lẩu', image_url: '60001665-lau-dai-bac_1_1.jpg' },
  { id: 7, name: 'Lẩu Hồng Ngọc', price: 169000, category: 'Lẩu', image_url: 'lau-hong-ngoc.jpg' },
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
  { id: 19, name: 'Ba Chỉ Heo Iberico', price: 229000, category: 'Heo Cừu', image_url: '60001584-ba-chi-heo-iberico_2_1.jpg' },
  { id: 20, name: 'Bắp Heo Mỹ Cuộn', price: 159000, category: 'Heo Cừu', image_url: 'b_p_heo_my_cu_n.jpg' },
  { id: 21, name: 'Ba Chỉ Cừu Non', price: 199000, category: 'Heo Cừu', image_url: 'bachicuu.jpg' },
  { id: 22, name: 'Má Heo Tươi', price: 129000, category: 'Heo Cừu', image_url: 'm_heo.png' },
  { id: 23, name: 'Sườn Heo Cay', price: 179000, category: 'Heo Cừu', image_url: 'mw_suon_heo_cay_1__1.jpg' },
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
  { id: 38, name: 'Sườn Bò Hoàng Kim', price: 259000, category: 'Bò', image_url: 'suon-bo-hoang-kim_2.jpg' },
  { id: 39, name: 'Nước Suối', price: 15000, category: 'Đồ Uống', image_url: '70000929_nuoc_khoang_bonita_1.jpg' },
  { id: 40, name: 'Soju Nho', price: 25000, category: 'Đồ Uống', image_url: '70000874_ruou_him_soju_nho_360ml__chai_1.jpg' },
  { id: 41, name: 'Nước Ép Trái Cây', price: 45000, category: 'Đồ Uống', image_url: 'co_mw_haruka_crystal.jpg' },
  { id: 42, name: 'Dưa Hấu Kim Tác', price: 18000, category: 'Đồ Uống', image_url: 'nuoc-dua-hau-kim-tac.jpg' },
  { id: 43, name: 'Soju Dưa Hấu', price: 39000, category: 'Đồ Uống', image_url: 'soju-him-duahau.jpg' },
  { id: 44, name: 'Trà Sữa Trân Châu', price: 49000, category: 'Đồ Uống', image_url: 'co_mw_tra_sua_tran_chau.jpg' },
  { id: 45, name: 'Soju Vải', price: 55000, category: 'Đồ Uống', image_url: 'soju-him-vai.jpg' },
  { id: 46, name: 'Coke Zero', price: 55000, category: 'Đồ Uống', image_url: 'co_mw_coke_zero_320ml.jpg' }
];

async function populate() {
  console.log('Starting menu population...');
  try {
    // Clear existing items first to avoid ID conflicts or just use UPSERT
    // For simplicity in this script, we'll delete and re-insert
    await pool.query('DELETE FROM order_items'); // Clean up dependencies first
    await pool.query('DELETE FROM menu_items');
    
    for (const item of items) {
      await pool.query(
        'INSERT INTO menu_items (id, name, category, price, image_url) VALUES ($1, $2, $3, $4, $5)',
        [item.id, item.name, item.category, item.price, item.image_url]
      );
    }
    console.log(`Successfully populated ${items.length} menu items.`);
    
    // Reset sequence for next inserts
    await pool.query("SELECT setval('menu_items_id_seq', (SELECT MAX(id) FROM menu_items))");
    
    process.exit(0);
  } catch (err) {
    console.error('Error populating menu:', err);
    process.exit(1);
  }
}

populate();
