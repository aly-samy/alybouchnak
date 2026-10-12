import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readData } from './read-data.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const domain = 'https://alybouchnak.com';
const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
const staticPaths = ['/', '/discography', '/playlists', '/theme-collections', '/meet-the-blooms', '/about', '/articles', '/press', '/resources', '/faq', '/epk', '/contact', '/safety-policy', '/privacy-policy', '/terms-of-service'];
const articles = readData(path.join(root, 'src/data/articles.ts'), 'articles');
const routes = staticPaths.map(route => ({ route }));
for (const [key, prefix] of [['albums', 'album'], ['tracks', 'track'], ['playlists', 'playlist'], ['themeCollections', 'theme-collection'], ['articles', 'article']]) {
  for (const item of readData(path.join(root, `src/data/${key}.ts`), key)) {
    const modified = item.dateModified;
    routes.push({ route: `/${prefix}/${item.slug}`, modified: modified && Date.parse(modified) <= Date.now() ? modified.slice(0, 10) : undefined });
  }
}
const header = '<?xml version="1.0" encoding="UTF-8"?>\n';
const sitemap = header + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + routes.map(({ route, modified }) =>
  `  <url><loc>${escape(domain + route)}</loc>${modified ? `<lastmod>${escape(modified)}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap);
const recent = articles.filter(a => a.type === 'NewsArticle' && Date.parse(a.datePublished) <= Date.now() && Date.parse(a.datePublished) > Date.now() - 48 * 60 * 60 * 1000);
const news = header + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n' + recent.map(a =>
  `<url><loc>${domain}/article/${escape(a.slug)}</loc><news:news><news:publication><news:name>Aly Bouchnak</news:name><news:language>en</news:language></news:publication><news:publication_date>${escape(a.datePublished)}</news:publication_date><news:title>${escape(a.title)}</news:title></news:news></url>`).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(root, 'public/news-sitemap.xml'), news);
fs.writeFileSync(path.join(root, 'public/sitemap-index.xml'), header + `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${domain}/sitemap.xml</loc></sitemap>${recent.length ? `<sitemap><loc>${domain}/news-sitemap.xml</loc></sitemap>` : ''}</sitemapindex>\n`);
console.log(`Sitemaps generated for ${routes.length} pages; ${recent.length} recent news articles.`);
