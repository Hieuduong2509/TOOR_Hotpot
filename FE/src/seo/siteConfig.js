const trimTrailingSlash = (url) => url.replace(/\/+$/, '');

export const siteUrl = trimTrailingSlash(
  import.meta.env.VITE_SITE_URL || 'https://toorhotpot.vn'
);

/** OG / Twitter — PNG ổn định hơn SVG trên Facebook */
export const defaultOgImagePath = '/images/pro1.png';

export const absoluteUrl = (path) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${p}`;
};

export const defaultOgImageUrl = absoluteUrl(defaultOgImagePath);

/** JSON-LD cho trang chủ — đồng bộ với thông tin thương hiệu trên Footer */
export function getRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'TOOR Hotpot',
    image: [defaultOgImageUrl],
    url: siteUrl,
    telephone: '+84-1900-234-546',
    email: 'marketing.mn@toorhotpot.vn',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tầng 4, Crescent Mall, 101 Tôn Dật Tiên',
      addressLocality: 'Phường Tân Mỹ',
      addressRegion: 'Thành phố Hồ Chí Minh',
      addressCountry: 'VN',
    },
    servesCuisine: 'Hot pot',
    priceRange: '$$',
  };
}
