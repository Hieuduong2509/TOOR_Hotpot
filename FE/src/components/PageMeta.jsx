import { Helmet } from 'react-helmet-async';
import { absoluteUrl, defaultOgImageUrl } from '../seo/siteConfig';

/**
 * @param {string} title
 * @param {string} description
 * @param {string} path - pathname, ví dụ "/" hoặc "/menu"
 * @param {string} [robots] - ví dụ "noindex, nofollow"
 * @param {string} [ogImage] - URL tuyệt đối tùy trang
 */
const PageMeta = ({ title, description, path, robots, ogImage }) => {
  const canonical = absoluteUrl(path);
  const image = ogImage || defaultOgImageUrl;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="vi" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots ? <meta name="robots" content={robots} /> : null}
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TOOR Hotpot" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="theme-color" content="#c41e3a" />
    </Helmet>
  );
};

export default PageMeta;
