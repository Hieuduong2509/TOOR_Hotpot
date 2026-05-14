import { useState } from 'react';
import { useFetchMenu } from '../hooks/useFetchMenu';

const categoryStructure = [
  {
    name: 'Món Lẻ',
    subcategories: ['Lẩu', 'Heo Cừu', 'Bò', 'Hải Sản', 'Rau Nấm', 'Viên Thả Lẩu', 'Đồ Uống']
  },
  {
    name: 'Buffet',
    subcategories: ['Buffet Đặc Biệt', 'Buffet Thường']
  },
  {
    name: 'Set Menu',
    subcategories: ['Combo 4 Người', 'Combo 6 Người', 'Combo 8 Người']
  }
];

const Menu = () => {
  const { menuItems, loading, error } = useFetchMenu();
  const [expandedCategory, setExpandedCategory] = useState('Món Lẻ');
  const [selectedSub, setSelectedSub] = useState('Lẩu');

  const filteredItems = menuItems.filter((item) => {
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
      setSelectedSub('');
    }
  };

  return (
    <section className="page-section">
      <div className="breadcrumb">Trang chủ &gt; Thực đơn</div>
      <h1>Thực đơn</h1>
      <div className="menu-layout">
        <aside className="menu-sidebar">
          <h2>Danh mục</h2>
          <ul className="category-list">
            {categoryStructure.map((cat) => (
              <li key={cat.name} className="category-item">
                <span
                  className={`category-title ${expandedCategory === cat.name ? 'active' : ''}`}
                  onClick={() => handleMainClick(cat.name)}
                >
                  {cat.name}
                </span>
                {expandedCategory === cat.name && cat.subcategories.length > 0 && (
                  <ul className="subcategory-list">
                    {cat.subcategories.map(sub => (
                      <li
                        key={sub}
                        className={`subcategory-item ${selectedSub === sub ? 'active' : ''}`}
                        onClick={() => setSelectedSub(sub)}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </aside>
        <div className="menu-list">
          {loading && <div className="message">Đang tải thực đơn...</div>}
          {error && <div className="message error">{error}</div>}
          {!loading && !error && (
            <div className="menu-grid-new">
              {filteredItems.length === 0 ? (
                <p className="small-text">Không có món trong danh mục này.</p>
              ) : (
                filteredItems.map((item) => (
                  <div key={item.id} className="menu-item-box">
                    <img
                      src={`/Image/menu/${item.image_url || 'placeholder.png'}`}
                      alt={item.name}
                      className="menu-item-img"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/233x195?text=No+Image'; }}
                    />
                    <div className="menu-item-name">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
