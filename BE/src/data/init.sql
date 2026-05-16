CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  address TEXT NOT NULL,
  open_time VARCHAR(20) NOT NULL,
  close_time VARCHAR(20) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time VARCHAR(20) NOT NULL,
  guest_count INTEGER NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(120) NOT NULL,
  note TEXT,
  agree_policy BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  phone VARCHAR(40),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total_price NUMERIC(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO restaurants (name, address, open_time, close_time, phone, image_url)
VALUES
  ('Hotpot Story - Hà Nội', 'Số 1, Phố Nhà Thờ, Hoàn Kiếm, Hà Nội', '10:00', '22:00', '+84 24 3799 0000', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'),
  ('Manwah - TP.HCM', '123 Nguyễn Trãi, Quận 1, TP.HCM', '11:00', '23:00', '+84 28 3911 1100', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4');

INSERT INTO menu_items (name, category, description, price, image_url)
VALUES
  ('Lẩu Nấm', 'Lẩu', 'Lẩu nấm thanh ngọt, thanh lọc cơ thể.', 299000, '60000207-lau-nam_1_1.jpg'),
  ('Lẩu Kim Chi', 'Lẩu', 'Lẩu kim chi đậm đà cay nồng.', 319000, '60001017-lau-kim-chi_1_1.jpg'),
  ('Lẩu Mala Đài Loan', 'Lẩu', 'Lẩu Mala cay cay, tê tê đậm chất Đài Loan.', 359000, '60001563-lau-mala-dai-loan_1_1.jpg'),
  ('Lẩu Thái', 'Lẩu', 'Lẩu Thái chua cay chuẩn vị.', 329000, '60001564-lau-thai_1_1.jpg'),
  ('Lẩu Cà Chua', 'Lẩu', 'Lẩu cà chua thanh mát, dễ ăn.', 289000, '60001565-lau-ca-chua_1_1.jpg'),
  ('Lẩu Đài Bắc', 'Lẩu', 'Lẩu Đài Bắc thanh tao ngọt xương.', 349000, '60001665-lau-dai-bac_1_1.jpg'),
  ('Lẩu Mộc Thanh Trà', 'Lẩu', 'Lẩu Mộc Thanh Trà đặc trưng.', 369000, 'co_lau_moc_thanh_tra_14.jpg'),
  ('Lẩu Hồng Ngọc', 'Lẩu', 'Lẩu Hồng Ngọc thượng hạng.', 499000, 'lau-hong-ngoc.jpg'),
  ('Lẩu Tuyết Liên Hoa', 'Lẩu', 'Lẩu thanh tao, tươi mát.', 399000, 'tuyet-lien-hoa.jpg'),
  ('Buffet Đặc Biệt', 'Buffet', 'Buffet tự chọn đủ món, ăn không giới hạn.', 499000, 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9'),
  ('Set Menu Gia Đình', 'Set Menu', 'Set menu cho 4-5 người với nhiều món hot nhất.', 1299000, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836');
