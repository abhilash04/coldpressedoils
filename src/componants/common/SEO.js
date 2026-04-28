import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Amrutha Dharee';
const DEFAULT_DESCRIPTION = 'Buy premium cold-pressed oils extracted the traditional Wooden Ghani way. 100% natural, chemical-free, and rich in nutrients. Free delivery over ₹999.';
const DEFAULT_OG_IMAGE = 'https://amruthadharee.com/og-default.jpg';
const BASE_URL = 'https://amruthadharee.com';

/**
 * Dynamic SEO component.
 * Props:
 *  title        - page <title> (string)
 *  description  - meta description (string)
 *  ogImage      - Open Graph image URL (string)
 *  canonical    - canonical URL override (string)
 *  noIndex      - set true to noindex the page (bool)
 *  product      - product object { name, price, currency, availability } for product schema
 *  article      - article object { publishedDate, modifiedDate, author } for blog schema
 */
const SEO = ({
  title,
  description,
  ogImage,
  canonical,
  noIndex = false,
  product,
  article,
}) => {
  const location = useLocation();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Pure Wood Pressed Oils`;
  const metaDesc = description || DEFAULT_DESCRIPTION;
  const ogImg = ogImage || DEFAULT_OG_IMAGE;
  const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────────
    document.title = fullTitle;

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = attr.split('=');
        el.setAttribute(attrName.replace('[', '').replace(']', ''), attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // ── Basic Meta ─────────────────────────────────────────────────────────
    setMeta('meta[name="description"]', 'name="description"', metaDesc);
    setMeta('meta[name="robots"]', 'name="robots"', noIndex ? 'noindex, nofollow' : 'index, follow');

    // ── Open Graph ─────────────────────────────────────────────────────────
    setMeta('meta[property="og:title"]', 'property="og:title"', fullTitle);
    setMeta('meta[property="og:description"]', 'property="og:description"', metaDesc);
    setMeta('meta[property="og:image"]', 'property="og:image"', ogImg);
    setMeta('meta[property="og:url"]', 'property="og:url"', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property="og:type"', article ? 'article' : 'website');
    setMeta('meta[property="og:site_name"]', 'property="og:site_name"', SITE_NAME);

    // ── Twitter Card ───────────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]', 'name="twitter:card"', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', metaDesc);
    setMeta('meta[name="twitter:image"]', 'name="twitter:image"', ogImg);

    // ── Canonical ──────────────────────────────────────────────────────────
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    // ── JSON-LD Structured Data ─────────────────────────────────────────────
    const removeSchema = (id) => { const s = document.getElementById(id); if (s) s.remove(); };

    // Product Schema
    if (product) {
      removeSchema('schema-product');
      const schema = document.createElement('script');
      schema.id = 'schema-product';
      schema.type = 'application/ld+json';
      schema.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: ogImg,
        description: metaDesc,
        brand: { '@type': 'Brand', name: SITE_NAME },
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: product.currency || 'INR',
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          url: canonicalUrl,
        },
      });
      document.head.appendChild(schema);
    } else {
      removeSchema('schema-product');
    }

    // Article Schema
    if (article) {
      removeSchema('schema-article');
      const schema = document.createElement('script');
      schema.id = 'schema-article';
      schema.type = 'application/ld+json';
      schema.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        image: ogImg,
        datePublished: article.publishedDate,
        dateModified: article.modifiedDate || article.publishedDate,
        author: { '@type': 'Person', name: article.author || 'Amrutha Dharee Editorial' },
        publisher: { '@type': 'Organization', name: SITE_NAME },
      });
      document.head.appendChild(schema);
    } else {
      removeSchema('schema-article');
    }

    // Org Schema (on every page)
    removeSchema('schema-org');
    const orgSchema = document.createElement('script');
    orgSchema.id = 'schema-org';
    orgSchema.type = 'application/ld+json';
    orgSchema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      contactPoint: { '@type': 'ContactPoint', telephone: '+91-9XXXXXXXXX', contactType: 'Customer Service' },
    });
    document.head.appendChild(orgSchema);

  }, [fullTitle, metaDesc, ogImg, canonicalUrl, noIndex, product, article]);

  return null;
};

export default SEO;
