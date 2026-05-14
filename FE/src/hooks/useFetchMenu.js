import { useState, useEffect } from 'react';
import api from '../services/api';

export const useFetchMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get('/menu');
        setMenuItems(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Có lỗi xảy ra khi tải thực đơn.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return { menuItems, loading, error };
};
